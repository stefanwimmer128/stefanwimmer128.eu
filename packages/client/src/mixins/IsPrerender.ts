import {
    Component,
    Vue,
} from "@vue-decorators/all";

import {
    PRERENDER,
} from "../prerender";

@Component
export default class IsPrerender extends Vue {
    isPrerender = PRERENDER;
}
