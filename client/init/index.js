import {
    sync,
} from "vuex-router-sync";

import {
    provide,
} from "./apollo";
import {
    router,
} from "./router";
import {
    store,
} from "./store";

sync(store, router);

export {
    provide,
    router,
    store,
};
