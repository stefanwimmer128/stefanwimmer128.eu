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
    export default class Core extends Vue {}
</script>

<template lang="pug">
    project(title="@stefanwimmer128/core")
        p Complex features made easy
        p Read documentation 
            a(href="https://stefanwimmer128.github.io/core" target="_blank") here
            | .
</template>
