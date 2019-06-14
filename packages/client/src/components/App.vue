<script lang="ts">
    import Vue from "vue";
    import {
        Component,
        State,
    } from "@vue-decorators/all";
    
    import {
        Action1,
    } from "../store/types";
    
    import * as History from "../store/history";
    
    @Component
    export default class App extends Vue {
        @State("loading")
        readonly loading!: boolean;
        
        @History.Getter("hasBefore")
        readonly hasBefore!: boolean;
        
        @History.Getter("hasNext")
        readonly hasNext!: boolean;
        
        @History.Action("go")
        readonly go!: Action1<number>;
    }
</script>

<template lang="pug">
    div#app.h-100
        div.bg-dark.navbar.navbar-dark.navbar-expand-md.sticky-top
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
        router-view(v-loading="loading").p-2
</template>
