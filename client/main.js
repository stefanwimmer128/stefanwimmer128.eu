import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import Vue from "vue";

import * as init from "./init";

import app from "./components/app.vue";

Vue.use(ElementUI, {
    locale,
});

export default new Vue({
    ...init,
    el: "#app",
    render(createElement) {
        if (/localhost/.test(location.host) || /stefanwimmer128.eu/.test(location.host))
            return createElement(app);
        else
            location.host = "stefanwimmer128.eu";
    },
});