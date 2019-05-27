<script lang="ts">
    import Vue from "vue";
    import {
        Component,
    } from "vue-property-decorator";
    
    @Component({
        metaInfo: {
            title: "MoreFood 2",
        },
    })
    export default class Projects extends Vue {
        back() {
            this.$router.push("/projects");
        }
    }
</script>

<template lang="pug">
    el-dialog(:visible="true" title="MoreFood 2" :before-close="back")
        p Bringing the next logical step from vanilla food. More food-items and a new crop on top.
        p More information can be found 
            a(href="https://minecraft.curseforge.com/projects/morefood2" target="_blank") here
            | .
</template>
