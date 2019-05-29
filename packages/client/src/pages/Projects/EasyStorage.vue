<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    
    @Component({
        metaInfo: {
            title: "EasyStorage",
        },
    })
    export default class Projects extends Vue {
        back() {
            this.$router.push("/projects");
        }
    }
</script>

<template lang="pug">
    el-dialog(:visible="true" title="EasyStorage" :before-close="back")
        p Easily store and load serializable objects, List's and Map's.
        p Read documentation 
            a(href="https://stefanwimmer128.github.io/easystorage" target="_blank") here
            | .
</template>
