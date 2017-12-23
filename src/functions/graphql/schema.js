import admin from "firebase-admin";
import {
    makeExecutableSchema,
} from "graphql-tools";
import {
    join,
} from "path";

import typeDefs from "./typeDefs.gql";

export default makeExecutableSchema({
    typeDefs,
    resolvers: {
        Blog: {
            entries: (obj, args) => {
                if (args.from > args.to)
                    throw new TypeError("`from` must be less then or equal to `to`");
                if (args.to >= obj.length)
                    throw new TypeError("`to` must be less then total number of blog entries");
                
                return new Promise((resolve, reject) =>
                    admin.database().ref("/blog").once(
                        "value",
                        value =>
                            resolve([].concat(value.val()).sort((a, b) =>
                                (new Date(a.date) - new Date(b.date)) * (args.reverse ? -1 : 1),
                            ).slice(args.from, args.to + 1)),
                        reject,
                    ),
                );
            },
        },
        Query: {
            blog: () =>
                new Promise((resolve, reject) =>
                    admin.database().ref("/blog").once(
                        "value",
                        value =>
                            resolve({
                                length: [].concat(value.val()).length,
                            }),
                        reject,
                    ),
                ),
            menu: () =>
                new Promise((resolve, reject) =>
                    admin.database().ref("/menu").once(
                        "value",
                        value =>
                            resolve([].concat(value.val()).sort((a, b) =>
                                a.order - b.order,
                            ).map(entry =>
                                ({
                                    ...entry,
                                    to: entry.to ? JSON.stringify(entry.to) : null,
                                }),
                            )),
                        reject,
                    ),
                ),
        },
    },
});
