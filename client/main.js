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
        if ([
            "localhost:5000",
            "www.stefanwimmer128.eu",
        ].includes(location.host))
            return createElement(app);
        else
            location.host = "www.stefanwimmer128.eu";
    },
});
