import { User } from "../models/userModel.js";
import { signToken } from "../utils/auth.js";
import { AppError } from "../utils/apperror.js";
import { validateSignupInput } from "../utils/validators.js";
import { comparePassword } from "../utils/hashpassword.js";
import USER_CONSTANTS from "../constants/userConstants.js";

export const createUser = async (data) => {
    validateSignupInput(data);
    const existingUser = await User.findOne({$or: [{email: data.email}, {username: data.username}]});
    if (existingUser) {
        throw new AppError(USER_CONSTANTS.MESSAGES.ERROR.USER_ALREADY_EXISTS, 400);
    }
    const user = await User.create(data);
    console.log(user);
    return {user, token: signToken(user)};
}

export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
      throw new AppError(USER_CONSTANTS.MESSAGES.ERROR.MISSING_LOGIN_FIELDS, 400);
    }
  
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError(USER_CONSTANTS.MESSAGES.ERROR.INVALID_LOGIN_CREDENTIALS, 401);
    }
  
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new AppError(USER_CONSTANTS.MESSAGES.ERROR.INVALID_LOGIN_CREDENTIALS, 401);
    }
  
    return { user, token: signToken(user) };
};

export const getAllUsers = async () => {
    try {
        const users = await User.find().select('-password');
        return users;
    } catch (error) {
        throw new AppError('Error fetching users', 500);
    }
};