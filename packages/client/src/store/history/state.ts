import {
    Route,
} from "vue-router";

export type State = {
    blocked: boolean,
    routes: Route[],
    index: number,
};

export default {
    blocked: false,
    routes: [],
    index: -1,
} as State;
