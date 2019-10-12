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
    @import "../init";
    
    #copyright {
        font-size: $font-size-sm;
    }
</style>

<template lang="pug">
    #app
        b-navbar(type="dark" variant="dark" toggleable="lg").sticky-top.border-bottom.border-secondary
            .container
                b-navbar-brand(tag="el-button-group").navbar-brand.text-monospace
                    el-button(type="text" @click="$router.go(-1)") &lt;
                    el-button(type="text" @click="$router.push('/')").mx-1 stefanwimmer128
                    el-button(type="text" @click="$router.go(1)") /&gt;
                b-navbar-toggle(target="navbar")
                b-collapse(is-nav)#navbar
                    b-navbar-nav
                        b-nav-item(to="/about") About me
                        b-nav-item(to="/projects") Projects
                        b-nav-item(to="/blog") Blog
                        b-nav-item(href="https://github.com/stefanwimmer128" target="_blank") GitHub
        loading(:loading="loading").container.mx-2.mx-sm-auto.w-auto.mt-3.py-3.rounded.bg-dark.text-light
            router-view
        .container.mt-3.py-2.rounded-pill.bg-dark.text-center.text-monospace.text-white-50#copyright Copyright (c) 2017-2019, Stefan Wimmer
</template>
