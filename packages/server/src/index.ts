import "source-map-support/register";

import {
    credential,
    initializeApp,
} from "firebase-admin";
import {
    config,
} from "firebase-functions";

initializeApp({
    credential: credential.applicationDefault(),
});

export {
    default as blogCounter,
} from "./blogCounter";
export {
    default as graphql,
} from "./graphql";
export {
    default as voyager,
} from "./voyager";
