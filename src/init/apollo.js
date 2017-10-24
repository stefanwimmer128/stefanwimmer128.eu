import {
    ApolloClient,
    createBatchingNetworkInterface
} from "apollo-client";
import Vue from "vue";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
    defaultClient: new ApolloClient({
        connectToDevTools: process.env.NODE_ENV === "development",
        networkInterface: createBatchingNetworkInterface({
            uri: "/graphql",
        }),
    }),
    defaultOptions: {
        $loadingKey: "pending",
    },
});
