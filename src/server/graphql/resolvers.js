import {
    firestore,
} from "firebase-admin";

export default {
    Query: {
        async blog(root, args, context, info) {
            return (await firestore().collection("blog").orderBy("date", "desc").offset(args.offset).limit(args.limit).get()).docs.map(doc =>
                Object.assign(doc.data(), {
                    date: doc.get("date").toDate().toISOString(),
                }),
            );
        },
    },
};
