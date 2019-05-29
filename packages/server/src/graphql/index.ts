import {
    ApolloServer,
} from "apollo-server-express";
import express from "express";
import {
    https,
} from "firebase-functions";

import typeDefs from "./typeDefs.gql";
import resolvers from "./resolvers";

export const graphql = https.onRequest((app => {
    new ApolloServer({
        typeDefs,
        resolvers,
        
        playground: true,
        introspection: true,
    }).applyMiddleware({
        app,
        
        cors: true,
    });
    
    return app;
})(express()));
