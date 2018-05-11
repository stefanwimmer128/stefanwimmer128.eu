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
    data: {
        app: false,
    },
    el: "#app",
    mounted() {
        if (! [
            "localhost:5000",
            "www.stefanwimmer128.eu",
        ].includes(location.host))
            return void (location.host = "www.stefanwimmer128.eu");
        
        this.app = true;
        
        this.$router.beforeEach((to, from, next) => {
            this.$store.commit("loading", true);
            next();
        });
        this.$router.afterEach((to, from) => {
            this.$store.commit("loading", false);
        });
    },
    render(createElement) {
        if (this.app)
            return createElement(app);
    },
});
