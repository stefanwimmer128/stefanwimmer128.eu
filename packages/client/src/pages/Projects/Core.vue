<script lang="ts">
    import Vue from "vue";
    import {
        Component,
    } from "vue-property-decorator";
    
    @Component({
        metaInfo: {
            title: "@stefanwimmer128/core",
        },
    })
    export default class Projects extends Vue {
        back() {
            this.$router.push("/projects");
        }
    }
</script>

<template lang="pug">
    el-dialog(:visible="true" title="@stefanwimmer128/core" :before-close="back")
        p Complex features made easy
        p Read documentation 
            a(href="https://stefanwimmer128.github.io/core" target="_blank") here
            | .
</template>
