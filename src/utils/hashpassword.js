import bcrypt from "bcryptjs";
import USER_CONSTANTS from "../constants/userConstants.js";

const { BCRYPT_SALT_ROUNDS } = USER_CONSTANTS.SECURITY;

export const hashPassword = (password) => {
    return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
};

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};