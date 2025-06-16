import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpires: process.env.JWT_EXPIRES || '7d',
    nodeEnv: process.env.NODE_ENV || 'development',
    tmdbAccessToken: process.env.TMDB_ACCESS_TOKEN,
};

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'TMDB_ACCESS_TOKEN'];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
}
