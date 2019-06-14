import {
    Route,
} from "vue-router";
import {
    ActionContext,
} from "vuex";

import router from "../../router";

import {
    State as Root,
} from "../state";

import {
    State,
} from "./state";

export function push(context: ActionContext<State, Root>, route: Route) {
    if (! context.state.blocked)
        context.commit("push", route);
    else
        context.commit("free");
}

export function go(context: ActionContext<State, Root>, n: number) {
    context.commit("go", n);
    context.commit("block");
    router.push(context.state.routes[context.state.index]);
}
