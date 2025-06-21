import { AppError } from '../apperror.js';
import { USER_LIST_ERROR_MESSAGES } from '../../constants/userList/userListErrors.js';

export const validateListInput = (userId, data) => {
    if (!userId) {
        throw new AppError(USER_LIST_ERROR_MESSAGES.LIST.USER_ID_REQUIRED, 400);
    }

    if (!data?.name) {
        throw new AppError(USER_LIST_ERROR_MESSAGES.LIST.NAME_REQUIRED, 400);
    }

    if (data.movies && !Array.isArray(data.movies)) {
        throw new AppError(USER_LIST_ERROR_MESSAGES.LIST.MOVIES_MUST_BE_ARRAY, 400);
    }
};

export const validateMovieInput = (movie) => {
    if (!movie.tmdbId) {
        throw new AppError(USER_LIST_ERROR_MESSAGES.LIST.MOVIE_TMDB_ID_REQUIRED, 400);
    }
}; 