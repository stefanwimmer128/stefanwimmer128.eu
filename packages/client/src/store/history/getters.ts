import {
    State,
} from "./state";

export function hasBefore(state: State) {
    return state.index > 0;
}

export function hasNext(state: State) {
    return state.index < (state.routes.length - 1);
}

export function last(state: State) {
    return state.index - 1 >= 0 ? state.routes[state.index - 1] : void 0;
}
