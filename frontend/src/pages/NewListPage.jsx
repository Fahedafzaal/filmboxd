"use client"

import { useState, useRef, useEffect } from "react"
import { useMutation, useLazyQuery } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/layout/Header"
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  Paper,
  IconButton,
  CircularProgress
} from "@mui/material"
import { CREATE_LIST } from "../graphql/mutations"
import { GET_USER_LISTS, SEARCH_MOVIES } from "../graphql/queries"
import { useAuth } from "../components/providers/AuthProvider"

export default function NewListPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: "",
    isPublic: true,
    isRanked: false,
  })
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchActive, setSearchActive] = useState(false)
  const searchBoxRef = useRef()
  const searchTimeout = useRef()

  const [createList, { loading }] = useMutation(CREATE_LIST, {
    refetchQueries: [{ query: GET_USER_LISTS, variables: { userId: user?.id } }],
    onCompleted: (data) => {
      navigate(`/lists/${data.createList.id}`)
    },
    onError: (error) => {
      alert("Error creating list: " + error.message)
    },
  })

  const [searchMovies, { data: searchData, loading: searchLoading }] = useLazyQuery(SEARCH_MOVIES)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
    await createList({
      variables: {
        data: {
          name: formData.name,
          description: formData.description,
          tags,
          isPublic: formData.isPublic,
          isRanked: formData.isRanked,
          movies: movies.map((m, i) => ({
            tmdbId: m.tmdbId,
            order: i + 1
          })),
        },
      },
    })
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // --- Movie Search Logic ---
  const handleMovieSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    setSearchActive(!!value)
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    if (value.length > 1) {
      searchTimeout.current = setTimeout(() => {
        searchMovies({ variables: { query: value } })
      }, 400)
    }
  }

  useEffect(() => {
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current)
    }
  }, [])

  const addMovie = (movie) => {
    if (!movies.some(m => m.tmdbId === movie.tmdbId)) {
      setMovies([...movies, { ...movie, order: movies.length + 1 }])
    }
    setSearchTerm("")
    setSearchActive(false)
    if (searchBoxRef.current) searchBoxRef.current.blur()
  }

  const removeMovie = (tmdbId) => {
    setMovies(movies.filter(m => m.tmdbId !== tmdbId))
  }

  // --- UI ---
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 300 }}>
          New List
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                    <Box component="span" sx={{ color: "primary.main", mr: 0.5 }}>
                      ●
                    </Box>
                    Name
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                    Tags
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    placeholder="e.g. top 10"
                    helperText="Press Tab to complete. Enter to create"
                  />
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                    Who can view
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={formData.isPublic ? "public" : "private"}
                      onChange={(e) => handleInputChange("isPublic", e.target.value === "public")}
                    >
                      <MenuItem value="public">Anyone — Public list</MenuItem>
                      <MenuItem value="private">Only me — Private list</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.isRanked}
                      onChange={(e) => handleInputChange("isRanked", e.target.checked)}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2">Ranked list</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        Show position for each film.
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                  Description
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your list..."
                />
                <Typography variant="caption" sx={{ color: "primary.main", cursor: "pointer" }}>
                  Show supported HTML
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Movie Search and List */}
          <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: "divider" }}>
            <Box sx={{ maxWidth: 500, position: "relative" }}>
              <TextField
                inputRef={searchBoxRef}
                value={searchTerm}
                onChange={handleMovieSearch}
                placeholder="Search for a film..."
                fullWidth
                autoComplete="off"
                sx={{ mb: 1 }}
                onFocus={() => setSearchActive(!!searchTerm)}
                onBlur={() => setTimeout(() => setSearchActive(false), 200)}
              />
              {searchActive && searchTerm.length > 1 && (
                <Box sx={{ position: "absolute", zIndex: 10, bgcolor: "background.paper", width: "100%", borderRadius: 1, boxShadow: 2, maxHeight: 320, overflowY: 'auto' }}>
                  {searchLoading && (
                    <Box sx={{ p: 2, textAlign: "center" }}><CircularProgress size={20} /></Box>
                  )}
                  {searchData?.searchMovies?.length > 0 ? (
                    searchData.searchMovies.map(movie => (
                      <Box
                        key={movie.tmdbId}
                        sx={{ p: 1, cursor: "pointer", display: "flex", alignItems: "center", gap: 2, '&:hover': { bgcolor: "action.hover" } }}
                        onClick={() => addMovie(movie)}
                      >
                        {movie.posterPath && (
                          <img src={`https://image.tmdb.org/t/p/w92${movie.posterPath}`} alt={movie.title} style={{ width: 32, borderRadius: 4 }} />
                        )}
                        <span>{movie.title} {movie.releaseYear && <span style={{ color: "#888" }}>({movie.releaseYear})</span>}</span>
                      </Box>
                    ))
                  ) : (!searchLoading && searchTerm.length > 1) ? (
                    <Box sx={{ p: 2, color: "text.secondary", textAlign: "center" }}>No results</Box>
                  ) : null}
                </Box>
              )}
            </Box>

            {/* Selected Movies List */}
            <Box sx={{ mt: 3 }}>
              {movies.length > 0 ? movies.map((movie, idx) => (
                <Box key={movie.tmdbId} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1, bgcolor: "background.paper", borderRadius: 1, p: 1.5 }}>
                  <span style={{ minWidth: 24, color: '#888' }}>{formData.isRanked ? (idx + 1) : null}</span>
                  {movie.posterPath && (
                    <img src={`https://image.tmdb.org/t/p/w92${movie.posterPath}`} alt={movie.title} style={{ width: 32, borderRadius: 4 }} />
                  )}
                  <span style={{ flex: 1 }}>{movie.title} {movie.releaseYear && <span style={{ color: "#888" }}>({movie.releaseYear})</span>}</span>
                  <IconButton size="small" onClick={() => removeMovie(movie.tmdbId)} sx={{ color: "error.main" }}>×</IconButton>
                </Box>
              )) : (
                <Paper sx={{ p: 6, textAlign: "center", bgcolor: "background.paper" }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Your list is empty.
                  </Typography>
                  <Typography color="text.secondary">
                    Add films using the search above, or from the links on a film poster or page.
                  </Typography>
                </Paper>
              )}
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              CANCEL
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={!formData.name.trim() || loading}>
              {loading ? "SAVING..." : "SAVE"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

