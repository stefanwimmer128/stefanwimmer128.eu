<script lang="ts">
    import {
        Callable,
        Component,
        State,
        Vue,
    } from "@vue-decorators/all";
    
    import * as History from "../store/history";
    
    import Loading from "./Loading.vue";
    
    @Component({
        components: {
            Loading,
        },
    })
    export default class App extends Vue {
        @State("loading")
        readonly loading!: boolean;
        
        @History.Getter("hasBefore")
        readonly hasBefore!: boolean;
        
        @History.Getter("hasNext")
        readonly hasNext!: boolean;
        
        @History.Action("go")
        readonly go!: Callable<number>;
    }
</script>

<style lang="scss" scoped>
    #copyright {
        font-size: 12px;
    }
</style>

<template lang="pug">
    div#app
        div.bg-dark.navbar.border-bottom.border-secondary.navbar-dark.navbar-expand-md.sticky-top
            el-button-group.navbar-brand
                el-button(v-if="hasBefore" type="text" icon="el-icon-arrow-left" @click="go(-1)")
                el-button(type="text" @click="$router.push('/')") stefanwimmer128
                el-button(v-if="hasNext" type="text" icon="el-icon-arrow-right" @click="go(1)")
            button.navbar-toggler(data-target="#navbar" data-toggle="collapse")
                span.navbar-toggler-icon
            div.collapse.navbar-collapse#navbar
                div.navbar-nav
                    router-link(to="/about").nav-item.nav-link About me
                    router-link(to="/projects").nav-item.nav-link Projects
                    router-link(to="/blog").nav-item.nav-link Blog
                    a(href="https://github.com/stefanwimmer128" target="_blank").nav-item.nav-link GitHub
        loading(:loading="loading").bg-dark.m-2.mx-4.p-2.rounded.text-light
            router-view
        div.bg-dark.m-2.mx-4.p-2.rounded-pill.text-center.text-white-50#copyright Copyright (c) 2017-2019, Stefan Wimmer
</template>
