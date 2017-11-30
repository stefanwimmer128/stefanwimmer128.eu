import About from "../../pages/About";
import Blog from "../../pages/Blog";
import Error404 from "../../pages/Error404";
import Home from "../../pages/Home";

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
