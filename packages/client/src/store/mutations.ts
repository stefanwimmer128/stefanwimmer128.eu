import {
    State,
} from "./state";

export function loading(state: State, value: boolean) {
    state.loading = value;
}
