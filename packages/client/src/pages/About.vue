<script lang="ts">
    import {
        Component,
        Vue,
    } from "@vue-decorators/all";
    
    @Component({
        metaInfo: {
            title: "About",
        },
    })
    export default class About extends Vue {}
</script>

<template lang="pug">
    div
        h2 About me
        p I'm a Web Developer (in apprenticeship) and anime/manga/cartoon/book-enthusiast.
</template>
