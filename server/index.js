import admin from "firebase-admin";
import {
    config,
} from "firebase-functions";

admin.initializeApp(config().firebase);

export * from "./graphql";
