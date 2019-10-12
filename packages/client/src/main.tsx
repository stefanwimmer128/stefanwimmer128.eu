import {
    Callable,
    Component,
    Mutation,
    Vue,
} from "@vue-decorators/all";
import BootstrapVue from "bootstrap-vue";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import VueMeta from "vue-meta";
import {
    sync,
} from "vuex-router-sync";

import router from "./router";
import store from "./store";
import {
    provider as apolloProvider,
} from "./apollo";

import App from "./components/App.vue";

import {
    prerenderAfter,
} from "./prerender";

Vue.use(BootstrapVue);

Vue.use(ElementUI, {
    locale,
});

Vue.use(VueMeta);

sync(store, router);

const waitForVueMeta = prerenderAfter();

@Component({
    metaInfo: {
        titleTemplate: "stefanimmer128 - %s",
        title: "Loading...",
        changed() {
            waitForVueMeta();
        },
    },
    apolloProvider,
    router,
    store,
})
export default class Main extends Vue {
    @Mutation("loading")
    readonly loading!: Callable<boolean>;
    
    mounted() {
        this.$router.beforeEach((to, from, next) => {
            this.loading(true);
            
            next();
        });
        
        this.$router.afterEach((to, from) => {
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
