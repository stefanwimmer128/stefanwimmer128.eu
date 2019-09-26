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
            if (! (this.isMobile || this.isPrerender))
                this.$router.push("/projects");
        }
        
        mounted() {
            this.updateModal();
        }
        
        beforeUpdate() {
            this.updateModal();
        }
        
        updated() {
            this.updateModal();
        }
        
        updateModal() {
            if (this.isMobile || this.isPrerender)
                $(this.$refs.modal).modal("hide");
            else if (! $(this.$refs.modal).hasClass("show"))
                $(this.$refs.modal).modal("show");
            
            $(this.$refs.modal).on("hidden.bs.modal", this.back.bind(this));
        }
    }
</script>

<template lang="pug">
    div
        template(v-if="isMobile || isPrerender")
            h3 {{title}}
            slot
        div(v-else ref="modal").modal.fade
            div.modal-dialog.modal-lg
                div.modal-content.bg-dark.text-light
                    div.modal-header
                        h5.modal-title {{title}}
                        button(type="button" data-dismiss="modal").close.text-light &times;
                    div.modal-body
                        slot
</template>
