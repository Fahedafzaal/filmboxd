import { UserRepository } from '../repositories/userRepository.js';
import { signToken } from '../utils/auth.js';
import { AppError } from '../utils/apperror.js';
import { validateSignupInput, validateLoginInput } from '../utils/validators/index.js';
import { comparePassword } from '../utils/hashpassword.js';
import { USER_ERROR_MESSAGES } from '../constants/user/index.js';

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(data) {
        validateSignupInput(data);

        const existingUser = await this.userRepository.findByEmailOrUsername(
            data.email,
            data.username
        );
        if (existingUser) {
            throw new AppError(USER_ERROR_MESSAGES.USER_ALREADY_EXISTS, 400);
        }

        const user = await this.userRepository.create(data);
        return { user, token: signToken(user) };
    }

    async loginUser({ email, password }) {
        validateLoginInput({ email, password });

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError(USER_ERROR_MESSAGES.INVALID_LOGIN_CREDENTIALS, 401);
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new AppError(USER_ERROR_MESSAGES.INVALID_LOGIN_CREDENTIALS, 401);
        }

        return { 
            success: true,
            message: 'Login successful', 
            user, 
            token: signToken(user) 
        };
    }
}
