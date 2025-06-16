export const TMDB_API = {
    BASE_URL: 'https://api.themoviedb.org/3',
    ENDPOINTS: {
        SEARCH_MOVIE: 'search/movie',
        MOVIE_DETAILS: 'movie',
    },
    PARAMS: {
        LANGUAGE: 'en-US',
        INCLUDE_ADULT: false,
    },
};

export const TMDB_ERROR_MESSAGES = {
    NO_RESULTS: 'No results found in TMDB response',
    INVALID_KEY: 'TMDB API key is invalid or expired',
    ENDPOINT_NOT_FOUND: 'TMDB API endpoint not found',
    RATE_LIMIT: 'TMDB API rate limit exceeded',
    NO_RESPONSE: 'No response received from TMDB API',
}; 