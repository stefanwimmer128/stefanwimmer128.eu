import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import Vue from "vue";
import {
    sync,
} from "vuex-router-sync";

import router from "./router";
import store from "./store";
import apolloProvider from "./apollo/provider";

import app from "./components/app.vue";

import {
    prerenderAfter,
} from "./prerender";

Vue.use(ElementUI, {
    locale,
});

sync(store, router);

export default new Vue({
    el: "#app",
    router,
    store,
    apolloProvider,
    components: {
        app,
    },
    template: "<app />",
    mounted() {
        this.$router.beforeEach((from, to, next) => {
            store.commit("loading", true);
            next();
        });
        this.$router.afterEach((from, to, next) => {
            store.commit("loading", false);
        });
        
        prerenderAfter.resolve().then(() =>
            document.dispatchEvent(new Event("prerender")),
        );
    },
});
