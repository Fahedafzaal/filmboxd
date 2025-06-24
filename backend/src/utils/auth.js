import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import cookie from 'cookie';
import { User } from '../models/userModel.js';

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

export function setAuthCookie(res, token) {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
}

export function clearAuthCookie(res) {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });
}

export async function getUserFromRequest(req) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;
    if (!token) return null;
    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id).select('-password');
        return user;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}
