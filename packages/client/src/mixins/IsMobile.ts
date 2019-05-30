import Vue from "vue";
import {
    Component,
} from "vue-property-decorator";

@Component
export default class IsMobile extends Vue {
    get isMobile() {
        return window.matchMedia("only screen and (max-width: 760px)").matches;
    }
}
