import { AppError } from './apperror.js';
import { TMDB_ERROR_MESSAGES } from '../constants/external/index.js';

export const handleTMDBError = (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                throw new AppError(TMDB_ERROR_MESSAGES.INVALID_KEY, 401);
            case 404:
                throw new AppError(TMDB_ERROR_MESSAGES.ENDPOINT_NOT_FOUND, 404);
            case 429:
                throw new AppError(TMDB_ERROR_MESSAGES.RATE_LIMIT, 429);
            default:
                throw new AppError(
                    `TMDB API error: ${error.response.status} - ${error.response.statusText}`,
                    error.response.status
                );
        }
    } else if (error.request) {
        throw new AppError(TMDB_ERROR_MESSAGES.NO_RESPONSE, 503);
    } else {
        throw new AppError(`Error with TMDB service: ${error.message}`, 500);
    }
}; 