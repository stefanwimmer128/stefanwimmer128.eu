import {
    graphiqlExpress,
    graphqlExpress,
} from "apollo-server-express";
import express from "express";
import {
    https,
} from "firebase-functions";

import schema from "./schema";

export const graphiql = https.onRequest(express().use(graphiqlExpress({
    endpointURL: "/graphql",
})));

export const graphql = https.onRequest(express().use(graphqlExpress({
    schema,
})));
