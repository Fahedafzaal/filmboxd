import { Routes, Route } from "react-router-dom"
import { useAuth } from "./components/providers/AuthProvider"
import { Box, CircularProgress } from "@mui/material"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ListsPage from "./pages/ListsPage"
import NewListPage from "./pages/NewListPage"
import ListDetailPage from "./pages/ListDetailPage"

function App() {
  const { loading } = useAuth()

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/lists" element={<ListsPage />} />
      <Route path="/lists/new" element={<NewListPage />} />
      <Route path="/lists/:id" element={<ListDetailPage />} />
    </Routes>
  )
}

export default App
