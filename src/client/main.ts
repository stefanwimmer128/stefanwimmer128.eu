import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import Vue from "vue";
import {
    Component,
} from "vue-property-decorator";
import {
    sync,
} from "vuex-router-sync";

import router from "./router";
import store from "./store";
import apolloProvider from "./apollo/provider";

import App from "./components/App.vue";

import {
    prerenderAfter,
} from "./prerender";

Vue.use(ElementUI, {
    locale,
});

sync(store, router);

@Component({
    router,
    store,
    apolloProvider,
    
    components: {
        App,
    },
    
    template: "<app />"
})
export default class Main extends Vue {
    mounted() {
        this.$router.beforeEach((from, to, next) => {
            store.commit("loading", true);
            next();
        });
        this.$router.afterEach((from, to) => {
            store.commit("loading", false);
        });
        
        prerenderAfter.resolve().then(() =>
            document.dispatchEvent(new Event("prerender")),
        );
    }
}
