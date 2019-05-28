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
        children: [
            {
                path: "morefood2",
                component: () => import(/* webpackChunkName: "Projects/MoreFood2" */ "../pages/Projects/MoreFood2.vue"),
            },
            {
                path: "easystorage",
                component: () => import(/* webpackChunkName: "Projects/EasyStorage" */ "../pages/Projects/EasyStorage.vue"),
            },
            {
                path: "core",
                component: () => import(/* webpackChunkName: "Projects/Core" */ "../pages/Projects/Core.vue"),
            }
        ],
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
