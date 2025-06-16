import bcrypt from 'bcryptjs';
import { USER_SECURITY } from '../constants/user/index.js';

const { BCRYPT_SALT_ROUNDS } = USER_SECURITY;

export const hashPassword = (password) => {
    return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
};

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
