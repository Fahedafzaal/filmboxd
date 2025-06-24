import { createContext, useContext, useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_ME } from "../../graphql/queries"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const { _data, loading: queryLoading } = useQuery(GET_ME, {
    skip: !localStorage.getItem("token"),
    onCompleted: (data) => {
      setUser(data.me)
      setLoading(false)
    },
    onError: () => {
      localStorage.removeItem("token")
      setUser(null)
      setLoading(false)
    },
  })

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setLoading(false)
    }
  }, [])

  const login = (token, userData) => {
    localStorage.setItem("token", token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
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
