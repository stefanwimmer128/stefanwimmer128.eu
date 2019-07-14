<script lang="ts">
    import {
        Component,
        Vue,
    } from "@vue-decorators/all";
    
    @Component({
        metaInfo: {
            title: "Error 404 Not Found",
        },
    })
    export default class Error404 extends Vue {}
</script>

<template lang="pug">
    div
        h2 Error 404 Not Found
        p The requested path <code>{{$route.path}}</code> was not found on this server.
</template>
