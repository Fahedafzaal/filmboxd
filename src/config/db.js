import mongoose from "mongoose";
import { config } from "dotenv";

config();

const connectDB = () => {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.error("MONGODB_URI is not defined in environment variables");
        process.exit(1);
    }

    mongoose.connect(mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
        process.exit(1);
    });
};

export default connectDB;