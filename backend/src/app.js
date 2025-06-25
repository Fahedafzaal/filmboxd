import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs } from './api/graphql/typeDefs.js';
import { userResolvers } from './api/graphql/resolvers/userResolvers.js';
import { userListResolvers } from './api/graphql/resolvers/userListResolvers.js';
import connectDB from './config/db.js';
import { config } from './config/index.js';
import { getUserFromRequest } from './utils/auth.js';

const app = express();
const httpServer = http.createServer(app);

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(express.json());

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
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        });
        await server.start();

        app.use(
            '/',
            expressMiddleware(server, {
                context: async ({ req, res }) => {
                    const user = await getUserFromRequest(req);
                    return { user, res };
                }
            })
        );

        httpServer.listen({ port: config.port }, () => {
            console.log(`Server is running on http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
