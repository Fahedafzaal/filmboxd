import { Box, Typography } from "@mui/material"

export function MoviePoster({ movie, size = "md", onClick }) {
  const sizeClasses = {
    sm: "w-20 h-30",
    md: "w-36 h-54",
    lg: "w-48 h-72",
  }

  // Always build the full TMDB image URL if posterPath is present
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23374151'/%3E%3Ctext x='100' y='150' text-anchor='middle' fill='%239CA3AF' font-family='Arial' font-size='14'%3EMovie Poster%3C/text%3E%3C/svg%3E"

  // Get the year from releaseDate or releaseYear
  let year = null
  if (movie.releaseDate) {
    const d = new Date(movie.releaseDate)
    if (!isNaN(d)) year = d.getFullYear()
  } else if (movie.releaseYear) {
    year = movie.releaseYear
  }

  return (
    <Box className={`movie-poster ${sizeClasses[size]} relative group cursor-pointer`} onClick={onClick}>
      <Box
        component="img"
        src={posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover rounded-lg"
        loading="lazy"
      />
      <Box className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-200 flex flex-col justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 p-2">
        <Typography variant="body2" className="text-white text-center font-medium line-clamp-2">
          {movie.title}
        </Typography>
        {year && (
          <Typography variant="caption" className="text-gray-300 mt-1">
            {year}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
