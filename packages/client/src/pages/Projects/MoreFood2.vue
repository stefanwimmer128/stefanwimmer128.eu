<script lang="ts">
    import Vue from "vue";
    import {
        Component,
    } from "vue-property-decorator";
    
    import Project from "../../components/Project.vue";
    
    @Component({
        components: {
            Project,
        },
    })
    export default class MoreFood2 extends Vue {}
</script>

<template lang="pug">
    project(title="MoreFood2")
        p Bringing the next logical step from vanilla food. More food-items and a new crop on top.
        p More information can be found 
            a(href="https://minecraft.curseforge.com/projects/morefood2" target="_blank") here
            | .
</template>
