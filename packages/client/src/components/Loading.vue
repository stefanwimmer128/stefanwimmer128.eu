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
    }
</script>

<template lang="pug">
    div
        div(v-if="loading").d-flex.justify-content-center
            div(role="status").spinner-border
                span.sr-only Loading...
        slot(v-else)
</template>
