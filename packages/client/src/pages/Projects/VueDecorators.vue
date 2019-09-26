<script lang="ts">
    import {
        Component,
        Vue,
    } from "@vue-decorators/all";
    
    import Project from "../../components/Project.vue";
    
    @Component({
        components: {
            Project,
        },
    })
    export default class VueDecorators extends Vue {}
</script>

<template lang="pug">
    project(title="vue-decorators")
        p #[code @vue-decorators/all] - #[code @vue-decorators/apollo] - #[code @vue-decorators/types]
        p Decorators for Vue
        p More information can be found 
            a(href="https://yarn.pm/@vue-decorators/all" target="_blank") here
            | .
</template>
