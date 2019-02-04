import {
    ApolloServer,
    gql,
} from "apollo-server-express";
import express from "express";
import {
    https,
} from "firebase-functions";

import typeDefs from "./typeDefs.gql";
import resolvers from "./resolvers";

const app = express();

const server = new ApolloServer({
    typeDefs: gql(typeDefs),
    resolvers,
    
    playground: true,
    introspection: true,
});

server.applyMiddleware({
    app,
    cors: true,
});

export const graphql = https.onRequest(app);
