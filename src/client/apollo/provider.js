import Vue from "vue";
import VueApollo from "vue-apollo";

import defaultClient from "./client";

Vue.use(VueApollo);

export default new VueApollo({
    defaultClient,
});
