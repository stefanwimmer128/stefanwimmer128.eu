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
    @import "../_init.scss";
    
    #copyright {
        font-size: $font-size-sm;
    }
</style>

<template lang="pug">
    #app
        .navbar.navbar-dark.bg-dark.navbar-expand-md.sticky-top.border-bottom.border-secondary
            .container
                el-button-group.navbar-brand.text-monospace
                    el-button(type="text" @click="$router.go(-1)") &lt;
                    el-button(type="text" @click="$router.push('/')").mx-1 stefanwimmer128
                    el-button(type="text" @click="$router.go(1)") /&gt;
                button(data-target="#navbar" data-toggle="collapse").navbar-toggler
                    span.navbar-toggler-icon
                .collapse.navbar-collapse#navbar
                    .navbar-nav
                        router-link(to="/about").nav-item.nav-link About me
                        router-link(to="/projects").nav-item.nav-link Projects
                        router-link(to="/blog").nav-item.nav-link Blog
                        a(href="https://github.com/stefanwimmer128" target="_blank").nav-item.nav-link GitHub
        loading(:loading="loading").container.mx-2.mx-sm-auto.w-auto.mt-3.py-3.rounded.bg-dark.text-light
            router-view
        .container.mt-3.py-2.rounded-pill.bg-dark.text-center.text-monospace.text-white-50#copyright Copyright (c) 2017-2019, Stefan Wimmer
</template>
