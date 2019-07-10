
import express from "express";
import {
    https,
} from "firebase-functions";
import {
    express as voyager,
} from "graphql-voyager/middleware";

const app = express();

app.use(voyager({
    endpointUrl: "/graphql",
}))

export default https.onRequest(app);
