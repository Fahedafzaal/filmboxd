import { Box, Typography } from "@mui/material"

export function MoviePoster({ movie, size = "md", onClick }) {
  const sizeClasses = {
    sm: "w-20 h-30",
    md: "w-36 h-54",
    lg: "w-48 h-72",
  }

  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : "/placeholder.svg?height=300&width=200"

  return (
    <Box className={`movie-poster ${sizeClasses[size]} relative group cursor-pointer`} onClick={onClick}>
      <Box
        component="img"
        src={posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover rounded-lg"
        onError={(e) => {
          e.target.src = "/placeholder.svg?height=300&width=200"
        }}
      />
      <Box className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-200 flex flex-col justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 p-2">
        <Typography variant="body2" className="text-white text-center font-medium line-clamp-2">
          {movie.title}
        </Typography>
        {movie.releaseDate && (
          <Typography variant="caption" className="text-gray-300 mt-1">
            {new Date(movie.releaseDate).getFullYear()}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
