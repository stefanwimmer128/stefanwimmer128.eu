import "source-map-support/register";

import {
    initializeApp,
} from "firebase-admin";
import {
    config,
} from "firebase-functions";

initializeApp(config().firebase);

export * from "./graphql";

export { default as blogCounter } from "./events/blogCounter";
