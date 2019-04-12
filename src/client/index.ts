import "@babel/polyfill";
import "whatwg-fetch";

import "bootstrap";

import "./main.scss";

import App from "./main";

const app = new App({
    el: "#app",
});

if (process.env.NODE_ENV === "development")
    (<any>window).$app = app;
