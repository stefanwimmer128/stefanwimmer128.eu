import {
    namespace,
} from "@vue-decorators/all";
import {
    Module,
} from "vuex";

import {
    State as Root,
} from "../state";

import state, {
    State as History,
} from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
} as Module<History, Root>;

export const {
    State,
    Getter,
    Mutation,
    Action,
} = namespace("history");
