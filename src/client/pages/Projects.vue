<script lang="ts">
    import Vue from "vue";
    import {
        Component,
    } from "vue-property-decorator";
    
    @Component({
        metaInfo: {
            title: "Projects",
        },
    })
    export default class Projects extends Vue {}
</script>

<template lang="pug">
    div
        h1 Projects
        p In future you will find a selection of my current projects here. Until then please refere to my GitHub page.
</template>
