<script lang="ts">
    import Vue from "vue";
    import {
        Component,
    } from "vue-property-decorator";
    
    @Component({
        metaInfo: {
            title: "Error 404 Not Found",
        },
    })
    export default class Error404 extends Vue {}
</script>

<template lang="pug">
    div
        h1 Error 404 Not Found
        p The requested path <code>{{$route.path}}</code> was not found on this server.
</template>
