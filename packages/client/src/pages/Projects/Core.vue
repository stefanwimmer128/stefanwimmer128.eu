<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    
    @Component({
        metaInfo: {
            title: "@stefanwimmer128/core",
        },
    })
    export default class Projects extends Vue {
        private visible: boolean = true;
        
        back() {
            this.$router.push("/projects");
        }
    }
</script>

<template lang="pug">
    el-dialog(:visible.sync="visible" title="@stefanwimmer128/core" @closed="back")
        p Complex features made easy
        p Read documentation 
            a(href="https://stefanwimmer128.github.io/core" target="_blank") here
            | .
</template>
