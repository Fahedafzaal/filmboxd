import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export const signToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        config.jwtSecret,
        {
            expiresIn: config.jwtExpires,
        }
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (_error) {
        throw new Error('Invalid or expired token');
    }
};
