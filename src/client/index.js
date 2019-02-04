import "@babel/polyfill";
import "whatwg-fetch";

import "bootstrap";

import "./main.scss";

import app from "./main";

if (process.env.NODE_ENV === "development")
    window.$app = app;
