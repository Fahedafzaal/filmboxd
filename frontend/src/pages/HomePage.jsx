import { useAuth } from "../components/providers/AuthProvider"
import { Header } from "../components/layout/Header"
import { MoviePoster } from "../components/movies/MoviePoster"
import { Box, Typography, Button, Container, Grid } from "@mui/material"
import { Link } from "react-router-dom"

const newMovies = [
  { tmdbId: 1, title: "La chambre des merveilles", posterPath: "/example1.jpg", releaseDate: "2024-06-05" },
  { tmdbId: 2, title: "Sinners", posterPath: "/example2.jpg", releaseDate: "2024-05-09" },
  { tmdbId: 3, title: "Pretty Woman", posterPath: "/example3.jpg", releaseDate: "2024-06-06" },
  { tmdbId: 4, title: "Eternal Sunshine", posterPath: "/example4.jpg", releaseDate: "2024-06-06" },
  { tmdbId: 5, title: "The Muppets", posterPath: "/example5.jpg", releaseDate: "2024-06-05" },
]

const popularMovies = [
  { tmdbId: 6, title: "Sinners", posterPath: "/example6.jpg", releaseDate: "2024" },
  { tmdbId: 7, title: "Memento", posterPath: "/example7.jpg", releaseDate: "2000" },
  { tmdbId: 8, title: "The Phoenician", posterPath: "/example8.jpg", releaseDate: "2024" },
  { tmdbId: 9, title: "Bring Her Back", posterPath: "/example9.jpg", releaseDate: "2024" },
  { tmdbId: 10, title: "Lilo & Stitch", posterPath: "/example10.jpg", releaseDate: "2002" },
  { tmdbId: 11, title: "Final Destination", posterPath: "/example11.jpg", releaseDate: "2000" },
]

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Box className="min-h-screen bg-gray-900">
        <Header />
        <Box className="flex items-center justify-center h-96">
          <Typography className="text-white">Loading...</Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box className="min-h-screen bg-gray-900">
      <Header />

      <Container maxWidth="xl" className="py-8">
        {user ? (
          <>
            <Box className="text-center mb-12">
              <Typography variant="h3" className="text-gray-300 mb-2 font-light">
                Welcome {user.username}. Here's what we've been watching...
              </Typography>
              <Typography variant="body1" className="text-gray-400">
                This homepage will become customized as you follow active members on Filmboxd.
              </Typography>
            </Box>

            <Box className="mb-12">
              <Box className="flex justify-between items-center mb-6">
                <Typography variant="h5" className="text-gray-300 uppercase tracking-wide">
                  New on Filmboxd
                </Typography>
                <Typography variant="body2" className="text-gray-400">
                  ⚡ YOUR ACTIVITY
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {newMovies.map((movie) => (
                  <Grid item key={movie.tmdbId} xs={6} sm={4} md={3} lg={2}>
                    <Box className="text-center">
                      <MoviePoster movie={movie} />
                      <Box className="mt-2">
                        <Typography variant="body2" className="text-yellow-400">
                          ★★★½
                        </Typography>
                        <Typography variant="caption" className="text-gray-400">
                          {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box className="mb-12">
              <Box className="flex justify-between items-center mb-6">
                <Typography variant="h5" className="text-gray-300 uppercase tracking-wide">
                  Popular on Filmboxd
                </Typography>
                <Button component={Link} to="/popular" className="text-green-400 hover:text-green-300 normal-case">
                  More
                </Button>
              </Box>

              <Grid container spacing={3}>
                {popularMovies.map((movie) => (
                  <Grid item key={movie.tmdbId} xs={6} sm={4} md={3} lg={2}>
                    <MoviePoster movie={movie} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-8 text-center">
              <Typography variant="h4" className="text-white font-bold mb-2">
                EVER DREAMT OF A BETTER VERSION OF YOURSELF?
              </Typography>
              <Typography variant="body1" className="text-gray-300 mb-4">
                Get annual and all-time stats, filtering by your favorite streaming services, watchlist notifications,
                no third-party ads and more...
              </Typography>
              <Button variant="contained" color="primary" size="large" className="font-bold">
                UPGRADE TO PRO
              </Button>
            </Box>
          </>
        ) : (
          <Box className="text-center py-20">
            <Typography variant="h2" className="text-white mb-6 font-light">
              Collect, curate, and share your favorite films.
            </Typography>
            <Typography variant="h6" className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Filmboxd is the perfect way to group films. Create lists, share with friends, and discover new movies to
              watch.
            </Typography>
            <Box className="flex gap-4 justify-center">
              <Button component={Link} to="/signup" variant="contained" color="primary" size="large">
                Get Started
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Sign In
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  )
}
