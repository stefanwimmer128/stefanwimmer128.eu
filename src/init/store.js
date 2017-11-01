import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

export const store = new Vuex.Store({
    mutations: {
        devPanel: (state, devPanel) =>
            state.devPanel = devPanel,
    },
    plugins: process.env.NODE_ENV === "development" ? [
        createLogger({
            collapsed: false,
        }),
    ] : [],
    state: {
        devPanel: false,
    },
});
