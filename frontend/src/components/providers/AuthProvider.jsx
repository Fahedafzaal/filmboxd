import { createContext, useContext, useState, useEffect } from "react"
import { useQuery, useApolloClient, useMutation } from "@apollo/client"
import { CURRENT_USER } from "../../graphql/queries"
import { LOGOUT } from "../../graphql/mutations"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const client = useApolloClient()

  const [logoutMutation] = useMutation(LOGOUT)

  const { data, loading: queryLoading } = useQuery(CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    onCompleted: (data) => {
      if (data?.me) {
        setUser(data.me)
      } else {
        setUser(null)
      }
      setLoading(false)
    },
    onError: (error) => {
      console.error("Auth error:", error)
      setUser(null)
      setLoading(false)
    },
  })

  useEffect(() => {
    if (data?.me) {
      setUser(data.me)
    } else if (data && !data.me) {
      // Query completed but no user data
      setUser(null)
    }
    
    if (!queryLoading) {
      setLoading(false)
    }
  }, [data, queryLoading])

  const login = async (userData) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      // Call the logout mutation to clear the backend cookie
      await logoutMutation()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Clear local state and cache regardless of mutation success
      setUser(null)
      await client.clearStore()
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading: loading || queryLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
