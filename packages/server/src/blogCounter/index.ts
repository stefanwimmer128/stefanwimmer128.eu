import {
    FieldValue,
} from "@google-cloud/firestore";
import {
    firestore,
} from "firebase-admin";
import functions from "firebase-functions";

export default functions.firestore.document("blog/{documentUid}").onWrite((change, context) => {
    if (change.before.exists !== change.after.exists)
        firestore().doc("blog/__count").update({
            count: FieldValue.increment(Number(change.after.exists) - Number(change.before.exists)),
        });
});
