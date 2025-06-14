import { AppError } from './apperror.js';
import USER_CONSTANTS from '../constants/userConstants.js';
import { ERROR_MESSAGES } from '../constants/userListConstants.js';

const { VALIDATION, MESSAGES } = USER_CONSTANTS;

export const validateSignupInput = (data) => {
    if (!data.username || !data.email || !data.password) {
        throw new AppError(USER_CONSTANTS.MESSAGES.ERROR.MISSING_SIGNUP_FIELDS, 400);
    }

    if (data.username.length < USER_CONSTANTS.VALIDATION.MIN_USERNAME_LENGTH) {
        throw new AppError(USER_CONSTANTS.MESSAGES.ERROR.USERNAME_TOO_SHORT(USER_CONSTANTS.VALIDATION.MIN_USERNAME_LENGTH), 400);
    }

    if (data.password.length < USER_CONSTANTS.VALIDATION.MIN_PASSWORD_LENGTH) {
        throw new AppError(USER_CONSTANTS.MESSAGES.ERROR.PASSWORD_TOO_SHORT(USER_CONSTANTS.VALIDATION.MIN_PASSWORD_LENGTH), 400);
    }

    if (!USER_CONSTANTS.VALIDATION.EMAIL_REGEX.test(data.email)) {
        throw new AppError(USER_CONSTANTS.MESSAGES.ERROR.INVALID_EMAIL, 400);
    }
};

export const validateListInput = (userId, data) => {
    if (!userId) {
        throw new AppError(ERROR_MESSAGES.LIST.USER_ID_REQUIRED, 400);
    }

    if (!data?.name) {
        throw new AppError(ERROR_MESSAGES.LIST.NAME_REQUIRED, 400);
    }

    if (data.movies && !Array.isArray(data.movies)) {
        throw new AppError(ERROR_MESSAGES.LIST.MOVIES_MUST_BE_ARRAY, 400);
    }
};

export const validateMovieInput = (movie) => {
    if (!movie.tmdbId) {
        throw new AppError(ERROR_MESSAGES.LIST.MOVIE_TMDB_ID_REQUIRED, 400);
    }
};