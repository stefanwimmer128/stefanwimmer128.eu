<script lang="ts">
    import {
        Component,
        Prop,
        mixins,
    } from "@vue-decorators/all";
    import $ from "jquery";
    
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
        
        back() {
            this.$router.push("/projects");
        }
        
        mounted() {
            if (! (this.isMobile || this.isPrerender)) {
                $("#project-modal").modal("show");
                
                $("#project-modal").on("hidden.bs.modal", this.back.bind(this));
            }
        }
    }
</script>

<template lang="pug">
    div
        template(v-if="isMobile || isPrerender")
            h3 {{title}}
            slot
        div(v-else).modal.fade#project-modal
            div.modal-dialog
                div.modal-content.bg-dark.text-light
                    div.modal-header
                        h5.modal-title {{title}}
                        button(type="button" data-dismiss="modal").close.text-light &times;
                    div.modal-body
                        slot
</template>
