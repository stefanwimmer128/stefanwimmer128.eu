<script lang="ts">
    import {
        Component,
        Mixins,
        Prop,
    } from "vue-property-decorator";
    
    import IsMobile from "../mixins/IsMobile";
    
    @Component({
        metaInfo() {
            return {
                title: this.title,
            };
        },
    })
    export default class Project extends Mixins(IsMobile) {
        @Prop({
            type: String,
            required: true,
        })
        private title!: string;
        
        private visible: boolean = true;
        
        back() {
            this.$router.push("/projects");
        }
    }
</script>

<template lang="pug">
    div
        template(v-if="isMobile")
            h1 {{title}}
            slot
        el-dialog(v-else :visible.sync="visible" :title="title" @closed="back")
            slot
</template>
