<script lang="ts">
    import Vue from "vue";
    import {
        Component,
    } from "vue-property-decorator";
    import {
        State,
    } from "vuex-class";
    
    @Component
    export default class App extends Vue {
        @State("loading")
        private loading!: boolean;
    }
</script>

<template lang="pug">
    div#app.h-100
        div.bg-dark.navbar.navbar-dark.navbar-expand-md.sticky-top
            router-link.navbar-brand(to="/") stefanwimmer128
            button.navbar-toggler(data-target="#navbar" data-toggle="collapse")
                span.navbar-toggler-icon
            div.collapse.navbar-collapse#navbar
                div.navbar-nav
                    router-link(to="/about").nav-item.nav-link About me
                    router-link(to="/projects").nav-item.nav-link Projects
                    router-link(to="/blog").nav-item.nav-link Blog
                    a(href="https://github.com/stefanwimmer128").nav-item.nav-link GitHub
        router-view(v-loading="loading").p-2
</template>
