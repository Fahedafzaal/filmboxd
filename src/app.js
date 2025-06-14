import express from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { typeDefs } from './api/graphql/typeDefs.js';
import { userResolvers } from './api/graphql/resolvers/userResolvers.js';
import { userListResolvers } from './api/graphql/resolvers/userListResolvers.js';
import connectDB from './config/db.js';
import { config } from './config/index.js';
import { verifyToken } from './utils/auth.js';
import { User } from './models/userModel.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const startServer = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        const server = new ApolloServer({
            typeDefs, 
            resolvers: {
                Query: {
                    ...userResolvers.Query,
                    ...userListResolvers.Query,
                },
                Mutation: {
                    ...userResolvers.Mutation,
                    ...userListResolvers.Mutation,
                },
                User: {
                    ...userListResolvers.User,
                }
            },
        });

        const { url } = await startStandaloneServer(server, {
            listen: { port: config.port },
            context: async ({ req }) => {
                // Get the token from the Authorization header
                const authHeader = req.headers.authorization || '';
                const token = authHeader.replace('Bearer ', '');
                
                if (!token) {
                    return { user: null };
                }

                try {
                    // Verify the token
                    const decoded = verifyToken(token);
                    
                    // Get the user from the database
                    const user = await User.findById(decoded.id).select('-password');
                    
                    return { user };
                } catch (error) {
                    console.error('Error verifying token:', error);
                    return { user: null };
                }
            }
        });
        console.log(`Server is running on ${url}`);
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
