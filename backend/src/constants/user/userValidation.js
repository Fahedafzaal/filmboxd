export const USER_VALIDATION = {
    MIN_USERNAME_LENGTH: 3,
    MIN_PASSWORD_LENGTH: 8,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const USER_ERROR_MESSAGES = {
    USERNAME_TOO_SHORT: (min) => `Username must be at least ${min} characters long`,
    PASSWORD_TOO_SHORT: (min) => `Password must be at least ${min} characters long`,
    MISSING_SIGNUP_FIELDS: 'Username, email, and password are required',
    INVALID_EMAIL: 'Please provide a valid email address',
    USER_ALREADY_EXISTS: 'A user with that email or username already exists',
    MISSING_LOGIN_FIELDS: 'Please provide email and password',
    INVALID_LOGIN_CREDENTIALS: 'Invalid credentials',
}; 