import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { Header } from "../components/layout/Header"
import { MoviePoster } from "../components/movies/MoviePoster"
import { Box, Typography, Container, Grid, Chip, Paper } from "@mui/material"
import { Lock, Public } from "@mui/icons-material"
import { GET_LIST } from "../graphql/queries"

export default function ListDetailPage() {
  const { id } = useParams()
  const { data, loading, error } = useQuery(GET_LIST, {
    variables: { id },
  })

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Header />
        <Container sx={{ py: 4, textAlign: "center" }}>
          <Typography>Loading list...</Typography>
        </Container>
      </Box>
    )
  }

  if (error || !data?.getList) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Header />
        <Container sx={{ py: 4, textAlign: "center" }}>
          <Typography color="error">List not found</Typography>
        </Container>
      </Box>
    )
  }

  const list = data.getList

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: "medium" }}>
              {list.name}
            </Typography>
            {list.isPublic ? <Public sx={{ color: "text.secondary" }} /> : <Lock sx={{ color: "text.secondary" }} />}
          </Box>

          <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
            {list.movies.length} film{list.movies.length !== 1 ? "s" : ""}
            {list.isRanked && " • Ranked"}
          </Typography>

          {list.description && (
            <Typography variant="body1" sx={{ mb: 2, maxWidth: 800 }}>
              {list.description}
            </Typography>
          )}

          {list.tags.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {list.tags.map((tag) => (
                <Chip key={tag} label={tag} sx={{ bgcolor: "grey.700", color: "text.secondary" }} />
              ))}
            </Box>
          )}
        </Box>

        {list.movies.length > 0 ? (
          <Grid container spacing={2}>
            {(
              list.isRanked
                ? [...list.movies].sort((a, b) => a.order - b.order)
                : list.movies
            ).map((movie, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={movie.tmdbId}>
                <Box sx={{ position: "relative" }}>
                  {list.isRanked && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -8,
                        left: -8,
                        bgcolor: "primary.main",
                        color: "white",
                        borderRadius: "50%",
                        width: 24,
                        height: 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        zIndex: 1,
                      }}
                    >
                      {index + 1}
                    </Box>
                  )}
                  <MoviePoster movie={movie} />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              This list is empty.
            </Typography>
            <Typography color="text.secondary">Add some films to get started!</Typography>
          </Paper>
        )}
      </Container>
    </Box>
  )
}
