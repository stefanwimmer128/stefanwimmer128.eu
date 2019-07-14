import {
    Component,
    Vue,
} from "@vue-decorators/all";

function computeIsMobile() {
    return window.matchMedia("only screen and (max-width: 760px)").matches;
}

const isMobileUpdate = new Set<IsMobile>();
function updateIsMobile() {
    const isMobile = computeIsMobile();
    for (const component of isMobileUpdate)
        component.isMobile = isMobile;
}

@Component
export default class IsMobile extends Vue {
    isMobile = computeIsMobile();
    
    mounted() {
        if (isMobileUpdate.size === 0)
            window.addEventListener("resize", updateIsMobile);
        
        isMobileUpdate.add(this);
    }
    
    beforeDestroy() {
        isMobileUpdate.delete(this);
        
        if (isMobileUpdate.size === 0)
            window.removeEventListener("resize", updateIsMobile);
    }
}
