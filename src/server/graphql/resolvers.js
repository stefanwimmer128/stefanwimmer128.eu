import {
    firestore,
} from "firebase-admin";

export default {
    Blog: {
        async count(root, args, context, info) {
            return (await firestore().doc("blog/__count").get()).get("count");
        },
        
        async nodes(root, args, context, info) {
            return (await firestore().collection("blog").orderBy("date", "desc").offset(args.offset).limit(args.limit).get()).docs.filter(doc =>
                    doc.id !== "__count",
                ).map(doc =>
                    Object.assign(doc.data(), {
                        date: doc.get("date").toDate().toISOString(),
                    }),
            );
        },
    },
    
    Query: {
        blog(root, args, context, info) {
            return {};
        },
    },
};
