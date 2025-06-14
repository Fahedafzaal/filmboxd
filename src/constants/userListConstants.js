export const TMDB_API = {
    BASE_URL: 'https://api.themoviedb.org/3',
    ENDPOINTS: {
        SEARCH_MOVIE: 'search/movie',
        MOVIE_DETAILS: 'movie'
    },
    PARAMS: {
        LANGUAGE: 'en-US',
        INCLUDE_ADULT: false
    }
};

export const ERROR_MESSAGES = {
    LIST: {
        USER_ID_REQUIRED: 'User ID is required',
        NAME_REQUIRED: 'List name is required',
        MOVIES_MUST_BE_ARRAY: 'Movies must be an array',
        MOVIE_TMDB_ID_REQUIRED: 'Movie tmdbId is required',
        INVALID_MOVIE_DATA: (tmdbId) => `Invalid movie data received for tmdbId ${tmdbId}`,
        FAILED_TO_FETCH_MOVIE: (tmdbId, error) => `Failed to fetch details for movie ${tmdbId}: ${error.message}`,
        SAVE_FAILED: 'Failed to save list'
    },
    LIST_NOT_FOUND: 'List not found',
    UNAUTHORIZED: 'Unauthorized to view this list',
    LIST_NOT_FOUND_OR_UNAUTHORIZED: 'List not found or unauthorized',
    TMDB: {
        NO_RESULTS: 'No results found in TMDB response',
        INVALID_KEY: 'TMDB API key is invalid or expired',
        ENDPOINT_NOT_FOUND: 'TMDB API endpoint not found',
        RATE_LIMIT: 'TMDB API rate limit exceeded',
        NO_RESPONSE: 'No response received from TMDB API'
    }
};

export const SORT_OPTIONS = {
    UPDATED_AT_DESC: { updatedAt: -1 }
};
