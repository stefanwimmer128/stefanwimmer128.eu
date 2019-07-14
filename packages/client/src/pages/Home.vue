<script lang="ts">
    import {
        Component,
        Vue,
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
        h2 Home
        p Welcome to my homepage. Here I present all of my current projects.
</template>
