import Vue from "vue";
import {
    Route,
} from "vue-router";

import {
    State,
} from "./state";

export function block(state: State) {
    state.blocked = true;
}

export function free(state: State) {
    state.blocked = false;
}

export function push(state: State, route: Route) {
    Vue.set(state, "routes", state.routes.slice(0, state.index + 1).concat(route));
    state.index++;
}

export function go(state: State, n: number) {
    state.index += n;
}
