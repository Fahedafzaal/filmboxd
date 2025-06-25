import { useState } from "react"
import { useMutation } from "@apollo/client"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../components/providers/AuthProvider"
import { Box, Card, CardContent, Typography, TextField, Button, Alert, Container } from "@mui/material"
import { SIGNUP } from "../graphql/mutations"

export default function SignupPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const [signupMutation, { loading }] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      login(data.signup.user)
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
      await signupMutation({
        variables: { data: formData },
      })
    } catch (error) {
      console.error("Signup error:", error)
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
            Join Filmboxd
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 3 }}>
            Create your account to start building movie lists
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              margin="normal"
              required
            />

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
              {loading ? "Creating account..." : "Sign Up"}
            </Button>

            <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#22c55e", textDecoration: "none" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
