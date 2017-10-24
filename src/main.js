import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import Vue from "vue";
import {
    sync,
} from "vuex-router-sync";

import "./main.scss";

Vue.use(ElementUI, {
    locale,
});

import * as apollo from "./init/apollo";
import * as router from "./init/router";
import * as store from "./init/store";

sync(store.store, router.router);

import app from "./components/app";

export default new Vue({
    ...apollo,
    ...router,
    components: {
        app,
    },
    el: "div#mount",
    template: "<app />",
});
