export default [
    {
        path: "/",
        component: () => import("../pages/Home.vue"),
    },
    {
        path: "/about",
        component: () => import("../pages/About.vue"),
    },
    {
        path: "/projects",
        component: () => import("../pages/Projects.vue"),
    },
    {
        path: "/blog",
        component: () => import("../pages/Blog.vue"),
    },
    {
        path: "*",
        component: () => import("../pages/Error404.vue"),
    },
];
