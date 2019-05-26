import {
    firestore,
} from "firebase-admin";

export default {
    Blog: {
        async count(root: any, args: any, context: any, info: any) {
            return (await firestore().doc("blog/__count").get()).get("count");
        },
        
        async nodes(root: any, args: { offset: number; limit: number; }, context: any, info: any) {
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
        blog(root: any, args: any, context: any, info: any) {
            return {};
        },
    },
};
