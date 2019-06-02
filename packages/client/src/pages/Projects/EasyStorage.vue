<script lang="ts">
    import Vue from "vue";
    import {
        Component,
    } from "@vue-decorators/all";
    
    import Project from "../../components/Project.vue";
    
    @Component({
        components: {
            Project,
        },
    })
    export default class EasyStorage extends Vue {}
</script>

<template lang="pug">
    project(title="EasyStorage")
        p Easily store and load serializable objects, List's and Map's.
        p Read documentation 
            a(href="https://stefanwimmer128.github.io/easystorage" target="_blank") here
            | .
</template>
