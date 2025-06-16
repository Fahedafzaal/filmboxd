import { User } from '../models/userModel.js';

export class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async findByEmail(email) {
        return await User.findOne({ email }).select('+password');
    }

    async findByEmailOrUsername(email, username) {
        return await User.findOne({
            $or: [{ email }, { username }],
        });
    }

    async findAll() {
        return await User.find().select('-password');
    }
}
