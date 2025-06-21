import mongoose from 'mongoose';
import { config } from './index.js';

const connectDB = () => {
    if (!config.mongoUri) {
        console.error('MONGODB_URI is not defined in environment variables');
        process.exit(1);
    }

    mongoose
        .connect(config.mongoUri)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => {
            console.error('Error connecting to MongoDB', err);
            process.exit(1);
        });
};

export default connectDB;
