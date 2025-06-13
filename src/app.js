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
import connectDB from './config/db.js';

dotenv.config();

const startServer = async () => {
    await connectDB();
    console.log('Connected to MongoDB');

    const server = new ApolloServer({
        typeDefs, 
        resolvers: {
            Query: {
                ...userResolvers.Query,
            },
            Mutation: {
                ...userResolvers.Mutation,
            },
        },
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`Server is running on ${url}`);
}

startServer();
