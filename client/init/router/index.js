import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";

Vue.use(VueRouter);

export const router = new VueRouter({
    linkActiveClass: "active",
    linkExactActiveClass: "active",
    mode: "history",
    routes,
});
