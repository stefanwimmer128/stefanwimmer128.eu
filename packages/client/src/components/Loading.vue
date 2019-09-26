<script lang="ts">
    import {
        Component,
        Prop,
        Vue,
    } from "@vue-decorators/all";
    
    @Component
    export default class Loading extends Vue {
        @Prop({
            required: true,
        })
        readonly loading!: boolean;
        
        @Prop({
            type: null,
            default: "div",
        })
        readonly tag!: any;
    }
</script>

<template lang="pug">
    command(:is="tag")
        div(v-if="loading").d-flex.justify-content-center
            div(role="status").spinner-border
                span.sr-only Loading...
        slot(v-else)
</template>
