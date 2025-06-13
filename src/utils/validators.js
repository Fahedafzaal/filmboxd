import { AppError } from './apperror.js';
import USER_CONSTANTS from '../constants/userConstants.js';

const { VALIDATION, MESSAGES } = USER_CONSTANTS;

export const validateSignupInput = (data) => {
    const { username, email, password } = data;
    
    if (!username || !email || !password) {
        throw new AppError(MESSAGES.ERROR.MISSING_SIGNUP_FIELDS, 400);
    }

    if (username.length < VALIDATION.MIN_USERNAME_LENGTH) {
        throw new AppError(MESSAGES.ERROR.USERNAME_TOO_SHORT(VALIDATION.MIN_USERNAME_LENGTH),400);
    }

    if (!VALIDATION.EMAIL_REGEX.test(email)) {
        throw new AppError(MESSAGES.ERROR.INVALID_EMAIL, 400);
    }

    if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
        throw new AppError(MESSAGES.ERROR.PASSWORD_TOO_SHORT(VALIDATION.MIN_PASSWORD_LENGTH), 400);
    }

    return true;
};