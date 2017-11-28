import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import Vue from "vue";
import {
    sync,
} from "vuex-router-sync";

Vue.use(ElementUI, {
    locale,
});

import {
    apolloProvider,
} from "./init/apollo";
import {
    router,
} from "./init/router";
import {
    store,
} from "./init/store";

sync(store, router);

import app from "./components/app";

export default new Vue({
    apolloProvider,
    router,
    components: {
        app,
    },
    el: "#app",
    store,
    template: "<app />",
});
