import ApolloClient from "apollo-boost";
import Vue from "vue";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

export const client = new ApolloClient();

export const provider = new VueApollo({
    defaultClient: client,
});
