import {
    firestore,
} from "firebase-admin";
import {
    makeExecutableSchema,
} from "graphql-tools";

import typeDefs from "./typeDefs.gql";

export default makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: {
            blog: (obj, args) =>
                firestore().collection("blog").orderBy("date", "desc").offset(args.offset).limit(args.limit).get().then(query =>
                    query.docs.map(doc =>
                        Object.assign(doc.data(), {
                            date: new Date(doc.data().date).toISOString(),
                        }),
                    ),
                ),
            menu: () =>
                firestore().collection("menu").orderBy("order").get().then(query =>
                    query.docs.map(doc =>
                        Object.assign(doc.data(), {
                            to: doc.data().to && JSON.stringify(doc.data().to),
                        }),
                    ),
                ),
        },
    },
});
