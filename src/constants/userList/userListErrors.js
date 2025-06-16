export const USER_LIST_ERROR_MESSAGES = {
    LIST: {
        USER_ID_REQUIRED: 'User ID is required',
        NAME_REQUIRED: 'List name is required',
        MOVIES_MUST_BE_ARRAY: 'Movies must be an array',
        MOVIE_TMDB_ID_REQUIRED: 'Movie tmdbId is required',
        INVALID_MOVIE_DATA: (tmdbId) => `Invalid movie data received for tmdbId ${tmdbId}`,
        FAILED_TO_FETCH_MOVIE: (tmdbId, error) =>
            `Failed to fetch details for movie ${tmdbId}: ${error.message}`,
        SAVE_FAILED: 'Failed to save list',
        NOT_FOUND: 'List not found',
    },
    UNAUTHORIZED: 'Unauthorized to view this list',
    LIST_NOT_FOUND_OR_UNAUTHORIZED: 'List not found or unauthorized',
}; 