import { AppError } from '../apperror.js';
import { USER_VALIDATION, USER_ERROR_MESSAGES } from '../../constants/user/userValidation.js';

export const validateSignupInput = (data) => {
    if (!data.username || !data.email || !data.password) {
        throw new AppError(USER_ERROR_MESSAGES.MISSING_SIGNUP_FIELDS, 400);
    }

    if (data.username.length < USER_VALIDATION.MIN_USERNAME_LENGTH) {
        throw new AppError(
            USER_ERROR_MESSAGES.USERNAME_TOO_SHORT(USER_VALIDATION.MIN_USERNAME_LENGTH),
            400
        );
    }

    if (data.password.length < USER_VALIDATION.MIN_PASSWORD_LENGTH) {
        throw new AppError(
            USER_ERROR_MESSAGES.PASSWORD_TOO_SHORT(USER_VALIDATION.MIN_PASSWORD_LENGTH),
            400
        );
    }

    if (!USER_VALIDATION.EMAIL_REGEX.test(data.email)) {
        throw new AppError(USER_ERROR_MESSAGES.INVALID_EMAIL, 400);
    }
};

export const validateLoginInput = ({ email, password }) => {
    if (!email || !password) {
        throw new AppError(USER_ERROR_MESSAGES.MISSING_LOGIN_FIELDS, 400);
    }
}; 