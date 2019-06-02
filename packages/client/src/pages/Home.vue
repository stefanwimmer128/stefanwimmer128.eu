<script lang="ts">
    import Vue from "vue";
    import {
        Component,
    } from "@vue-decorators/all";
    
    @Component({
        metaInfo: {
            title: "Home",
        },
    })
    export default class Home extends Vue {}
</script>

<template lang="pug">
    div
        h1 Home
        p Welcome to my homepage. Here I present all of my current projects.
</template>
