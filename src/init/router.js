import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import About from "../pages/About";
import Blog from "../pages/Blog";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";

export const router = new VueRouter({
    mode: "history",
    routes: [
        {
            component: Home,
            path: "/",
        },
        {
            component: Blog,
            path: "/blog",
        },
        {
            component: About,
            path: "/about",
        },
        {
            component: Error404,
            path: "*",
        },
    ],
});
