import {
    ApolloClient,
    createBatchingNetworkInterface
} from "apollo-client";
import Vue from "vue";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

export const apollo = new ApolloClient({
    connectToDevTools: process.env.NODE_ENV === "development",
    networkInterface: createBatchingNetworkInterface({
        opts: {
            credentials: "same-origin",
        },
        uri: "/graphql",
    }),
});

export const apolloProvider = new VueApollo({
    defaultClient: apollo,
    defaultOptions: {
        $loadingKey: "pending",
    },
});
