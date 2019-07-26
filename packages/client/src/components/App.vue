<script lang="ts">
    import {
        Component,
        State,
        Vue,
    } from "@vue-decorators/all";
    
    import Loading from "./Loading.vue";
    
    @Component({
        components: {
            Loading,
        },
    })
    export default class App extends Vue {
        @State("loading")
        readonly loading!: boolean;
    }
</script>

<style lang="scss" scoped>
    #copyright {
        font-size: 12px;
    }
</style>

<template lang="pug">
    div#app
        div.navbar.navbar-dark.navbar-expand-md.bg-dark.border-bottom.border-secondary.sticky-top
            el-button-group.navbar-brand.text-monospace
                el-button(type="text" @click="$router.go(-1)") &lt;
                el-button(type="text" @click="$router.push('/')").mx-1 stefanwimmer128
                el-button(type="text" @click="$router.go(1)") /&gt;
            button(data-target="#navbar" data-toggle="collapse").navbar-toggler
                span.navbar-toggler-icon
            div.collapse.navbar-collapse#navbar
                div.navbar-nav
                    router-link(to="/about").nav-item.nav-link About me
                    router-link(to="/projects").nav-item.nav-link Projects
                    router-link(to="/blog").nav-item.nav-link Blog
                    a(href="https://github.com/stefanwimmer128" target="_blank").nav-item.nav-link GitHub
        loading(:loading="loading").m-2.mx-4.p-2.rounded.bg-dark.text-light
            router-view
        div.m-2.mx-4.p-2.rounded-pill.bg-dark.text-center.text-monospace.text-white-50#copyright Copyright (c) 2017-2019, Stefan Wimmer
</template>
