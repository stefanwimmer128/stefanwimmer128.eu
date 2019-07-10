import {
    ApolloServer,
} from "apollo-server-express";
import express from "express";
import {
    https,
} from "firebase-functions";

import typeDefs from "./typeDefs.gql";
import resolvers from "./resolvers";

const app = express();

new ApolloServer({
    typeDefs,
    resolvers,
    
    playground: true,
    introspection: true,
}).applyMiddleware({
    app,
    
    cors: true,
});

export default https.onRequest(app);
