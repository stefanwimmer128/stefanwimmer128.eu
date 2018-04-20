import About from "../../pages/About.vue";
import Blog from "../../pages/Blog.vue";
import Error404 from "../../pages/Error404.vue";
import Home from "../../pages/Home.vue";

export default [
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
];
