import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

export const signToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES,
        }
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};