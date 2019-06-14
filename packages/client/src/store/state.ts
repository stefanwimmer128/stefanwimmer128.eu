import {
    State as History,
} from "./history/state";

export type State = {
    loading: boolean,
    
    history: History,
}

export default {
    loading: true,
} as State;
