import {
    InMemoryCache,
} from "apollo-cache-inmemory";
import {
    ApolloClient,
} from "apollo-client";
import {
    HttpLink,
} from "apollo-link-http";
import Vue from "vue";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "/graphql",
    }),
});

export const apolloProvider = new VueApollo({
    defaultClient,
    defaultOptions: {
        $fetchPolicy: "network-only",
    },
});

export const provide = apolloProvider.provide();
