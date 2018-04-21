<script>
    import gql from "graphql-tag";
    
    import {
        router,
    } from "../init/router";
    
    export default {
        apollo: {
            menu: {
                query: gql`query {
                    menu {
                        href
                        title
                        to
                    }
                }`,
                update: data =>
                    data.menu,
            },
        },
        data: () => ({
            menu: [],
        }),
        mounted() {
            router.beforeEach((to, from, next) => {
                this.$store.commit("loading", true);
                next();
            });
            router.afterEach((to, from) => {
                this.$store.commit("loading", false);
            });
        },
    };
</script>

<template lang="pug">
    div#app(v-loading="$apollo.loading")
        div.bg-dark.navbar.navbar-dark.navbar-expand-md.sticky-top
            router-link.navbar-brand(to="/") stefanwimmer128
            button.navbar-toggler(data-target="#navbar" data-toggle="collapse")
                span.navbar-toggler-icon
            div.collapse.navbar-collapse#navbar
                div.navbar-nav
                    template(v-for="(entry, i) in menu")
                        router-link.nav-item.nav-link(:key="i" :to="JSON.parse(entry.to)" v-if="entry.to") {{entry.title}}
                        a.nav-item.nav-link(:href="entry.href" :key="i" target="_blank" v-if="entry.href") {{entry.title}}
        router-view(v-loading= "$store.state.loading").px-2.py-2
</template>
