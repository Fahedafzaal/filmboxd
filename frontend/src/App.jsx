import { Routes, Route } from "react-router-dom"
import { useAuth } from "./components/providers/AuthProvider"
import { Box, CircularProgress } from "@mui/material"
import HomePage from "./pages/HomePage"

function App() {
  const { _user, loading } = useAuth()

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
        <CircularProgress color="primary" />
      </Box>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App
