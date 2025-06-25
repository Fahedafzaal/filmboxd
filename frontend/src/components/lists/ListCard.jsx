import { Link } from "react-router-dom"
import { Card, CardContent, Typography, Box, Chip } from "@mui/material"
import { Lock, Public } from "@mui/icons-material"
import { MoviePoster } from "../movies/MoviePoster"

export function ListCard({ list }) {
  const displayMovies = list.movies.slice(0, 4)

  return (
    <Card
      component={Link}
      to={`/lists/${list.id}`}
      className="no-underline transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      sx={{ textDecoration: "none" }}
    >
      <CardContent className="p-4">
        <Box className="flex gap-2 mb-3">
          {displayMovies.map((movie) => (
            <Box key={movie.tmdbId} className="flex-1">
              <MoviePoster movie={movie} size="sm" />
            </Box>
          ))}
          {displayMovies.length < 4 &&
            Array.from({ length: 4 - displayMovies.length }).map((_, index) => (
              <Box key={`empty-${index}`} className="flex-1 w-20 h-30 bg-gray-700 rounded-lg" />
            ))}
        </Box>

        <Box className="flex items-center justify-between mb-2">
          <Typography variant="h6" className="text-white font-medium">
            {list.name}
          </Typography>
          {list.isPublic ? <Public className="text-gray-400 text-xl" /> : <Lock className="text-gray-400 text-xl" />}
        </Box>

        <Typography variant="body2" className="text-gray-400 mb-2">
          {list.movies.length} film{list.movies.length !== 1 ? "s" : ""}
        </Typography>

        {list.description && (
          <Typography variant="body2" className="text-gray-300 mb-3 line-clamp-2">
            {list.description}
          </Typography>
        )}

        {list.tags.length > 0 && (
          <Box className="flex flex-wrap gap-1">
            {list.tags.slice(0, 3).map((tag) => (
              <Chip key={tag} label={tag} size="small" className="bg-gray-700 text-gray-300" />
            ))}
            {list.tags.length > 3 && (
              <Typography variant="caption" className="text-gray-400 self-center">
                +{list.tags.length - 3} more
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
