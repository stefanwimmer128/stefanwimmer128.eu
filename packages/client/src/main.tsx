import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import Vue from "vue";
import {
    Component,
    Mutation,
} from "@vue-decorators/all";
import {
    sync,
} from "vuex-router-sync";

import "./meta";

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
    readonly loading!: (value: boolean) => void
    
    mounted() {
        this.$router.beforeEach((from, to, next) => {
            this.loading(true);
            
            next();
        });
        this.$router.afterEach((from, to) => {
            this.loading(false);
        });
        
        prerenderAfter.resolve();
    }
    
    render() {
        return (
            <App />
        );
    }
}
