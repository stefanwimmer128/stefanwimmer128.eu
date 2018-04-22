export default [
    {
        component: () => import("../../pages/Home.vue"),
        path: "/",
    },
    {
        component: () => import("../../pages/About.vue"),
        path: "/about",
    },
    {
        component: () => import("../../pages/Blog.vue"),
        path: "/blog",
    },
    {
        component: () => import("../../pages/Error404.vue"),
        path: "*",
    },
];
