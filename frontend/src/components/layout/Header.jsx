import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material"
import { Search, Person, Movie, List, People, Book, Settings, Logout } from "@mui/icons-material"

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleUserMenuClose()
    navigate("/")
  }

  return (
    <AppBar position="static" className="border-b border-gray-700">
      <Toolbar className="max-w-7xl w-full mx-auto px-4 sm:px-6">
        <Box
          component={Link}
          to="/"
          className="flex items-center text-decoration-none mr-8 no-underline"
          sx={{ textDecoration: "none" }}
        >
          <Box className="flex gap-1 mr-2">
            <Box className="w-3 h-3 bg-orange-500 rounded-full" />
            <Box className="w-3 h-3 bg-green-500 rounded-full" />
            <Box className="w-3 h-3 bg-blue-500 rounded-full" />
          </Box>
          <Typography variant="h6" component="span" className="text-white font-bold">
            Filmboxd
          </Typography>
        </Box>

        <Box className="hidden md:flex gap-6 mr-auto">
          <Button
            component={Link}
            to="/films"
            startIcon={<Movie />}
            className="text-gray-300 hover:text-white transition-colors normal-case"
          >
            FILMS
          </Button>
          <Button
            component={Link}
            to="/lists"
            startIcon={<List />}
            className="text-gray-300 hover:text-white transition-colors normal-case"
          >
            LISTS
          </Button>
          <Button
            component={Link}
            to="/members"
            startIcon={<People />}
            className="text-gray-300 hover:text-white transition-colors normal-case"
          >
            MEMBERS
          </Button>
          <Button
            component={Link}
            to="/journal"
            startIcon={<Book />}
            className="text-gray-300 hover:text-white transition-colors normal-case"
          >
            JOURNAL
          </Button>
        </Box>

        <TextField
          size="small"
          placeholder="Search films..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-400" />
              </InputAdornment>
            ),
          }}
          className="w-64 mr-4"
        />

        {user ? (
          <>
            <IconButton onClick={handleUserMenuOpen} className="p-0">
              <Avatar className="w-8 h-8">{user.username[0].toUpperCase()}</Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleUserMenuClose} className="mt-2">
              <MenuItem component={Link} to="/profile" onClick={handleUserMenuClose} className="flex items-center">
                <Person className="mr-2" />
                Profile
              </MenuItem>
              <MenuItem component={Link} to="/lists" onClick={handleUserMenuClose} className="flex items-center">
                <List className="mr-2" />
                My Lists
              </MenuItem>
              <MenuItem component={Link} to="/settings" onClick={handleUserMenuClose} className="flex items-center">
                <Settings className="mr-2" />
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout} className="flex items-center text-red-400">
                <Logout className="mr-2" />
                Sign Out
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box className="flex gap-2">
            <Button component={Link} to="/login" variant="text" className="text-gray-300 hover:text-white normal-case">
              LOG IN
            </Button>
            <Button component={Link} to="/signup" variant="contained" color="primary" className="normal-case">
              SIGN UP
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
