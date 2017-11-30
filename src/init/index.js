import {
    sync,
} from "vuex-router-sync";

import {
    apolloProvider,
} from "./apollo";
import {
    router,
} from "./router";
import {
    store,
} from "./store";

sync(store, router);

export {
    apolloProvider,
    router,
    store,
};
