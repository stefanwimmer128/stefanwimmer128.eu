export default [
    {
        path: "/",
        component: () => import(/* webpackChunkName: "Home" */ "../pages/Home.vue"),
    },
    {
        path: "/about",
        component: () => import(/* webpackChunkName: "About" */ "../pages/About.vue"),
    },
    {
        path: "/projects",
        component: () => import(/* webpackChunkName: "Projects" */ "../pages/Projects.vue"),
    },
    {
        path: "/blog",
        component: () => import(/* webpackChunkName: "Blog" */ "../pages/Blog.vue"),
    },
    {
        path: "*",
        component: () => import(/* webpackChunkName: "Error404" */ "../pages/Error404.vue"),
    },
];
