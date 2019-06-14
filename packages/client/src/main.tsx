import {
    Component,
    Callable,
    Mutation,
} from "@vue-decorators/all";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import Vue from "vue";
import {
    Route,
} from "vue-router";
import {
    sync,
} from "vuex-router-sync";

import "./meta";

import router from "./router";
import store from "./store";
import apolloProvider from "./apollo/provider";

import * as History from "./store/history";

import App from "./components/App.vue";

import {
    prerenderAfter,
} from "./prerender";

Vue.use(ElementUI, {
    locale,
});

sync(store, router);

const waitForVueMeta = prerenderAfter();

@Component({
    metaInfo: {
        titleTemplate: "stefanimmer128 - %s",
        title: "Home",
        changed() {
            waitForVueMeta();
        },
    },
    router,
    store,
    apolloProvider,
})
export default class Main extends Vue {
    @Mutation("loading")
    readonly loading!: Callable<boolean>;
    
    @History.Action("push")
    readonly push!: Callable<Route>;
    
    mounted() {
        this.$router.beforeEach((to, from, next) => {
            this.loading(true);
            
            next();
        });
        this.$router.afterEach((to, from) => {
            this.loading(false);
            
            this.push(to);
        });
        
        prerenderAfter.resolve();
    }
    
    render() {
        return (
            <App />
        );
    }
}
