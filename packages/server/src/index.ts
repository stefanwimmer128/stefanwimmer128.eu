import "source-map-support/register";

import {
    initializeApp,
} from "firebase-admin";
import {
    config,
} from "firebase-functions";

initializeApp(config().firebase);

export {
    default as blogCounter,
} from "./blogCounter";
export {
    default as graphql,
} from "./graphql";
export {
    default as voyager,
} from "./voyager";
