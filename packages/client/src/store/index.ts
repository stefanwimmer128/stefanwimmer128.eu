import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import state, {
    State,
} from "./state";
import * as mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store<State>({
    state,
    mutations,
    plugins: process.env.NODE_ENV === "development" ? [
        createLogger({
            collapsed: false,
        }),
    ] : [],
});
