import { useState } from "react"
import { useMutation } from "@apollo/client"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../components/providers/AuthProvider"
import { Box, Card, CardContent, Typography, TextField, Button, Alert, Container } from "@mui/material"
import { LOGIN } from "../graphql/mutations"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      login(data.login.user)
      navigate("/")
    },
    onError: (error) => {
      setError(error.message)
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await loginMutation({
        variables: { data: formData },
      })
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Card sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", gap: 0.5, mr: 1 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: "secondary.main", borderRadius: "50%" }} />
              <Box sx={{ width: 12, height: 12, bgcolor: "primary.main", borderRadius: "50%" }} />
              <Box sx={{ width: 12, height: 12, bgcolor: "#3b82f6", borderRadius: "50%" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Filmboxd
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ textAlign: "center", mb: 1 }}>
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 3 }}>
            Sign in to your account to continue
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              margin="normal"
              required
            />

            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2 }}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#22c55e", textDecoration: "none" }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
