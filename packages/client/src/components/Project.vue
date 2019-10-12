<script lang="ts">
    import {
        Component,
        Prop,
        mixins,
    } from "@vue-decorators/all";
    
    import IsMobile from "../mixins/IsMobile";
    import IsPrerender from "../mixins/IsPrerender";
    
    @Component({
        metaInfo() {
            return {
                title: this.title,
            };
        },
    })
    export default class Project extends mixins(IsMobile, IsPrerender) {
        @Prop({
            required: true,
        })
        readonly title!: string;
        
        get useModal() {
            return ! (this.isMobile || this.isPrerender);
        }
        
        close() {
            this.$router.push("/projects");
        }
    }
</script>

<template lang="pug">
    div
        b-modal(v-if="useModal" size="lg" content-class="bg-dark text-light" header-close-variant="light" hide-footer :title="title" visible @hidden="close")
            slot
        template(v-else)
            h3 {{title}}
            slot
</template>
