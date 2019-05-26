import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: true,
    },
    mutations: {
        loading(state, value) {
            state.loading = value;
        },
    },
    plugins: process.env.NODE_ENV === "development" ? [
        createLogger({
            collapsed: false,
        }),
    ] : []
});
