<script>
    import gql from "graphql-tag";
    
    export default {
        apollo: {
            menu: {
                error(error) {
                    this.error = error;
                },
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
            error: null,
            menu: [],
        }),
        mounted() {
            this.$router.beforeEach((to, from, next) => {
                this.$store.commit("loading", true);
                next();
            });
            this.$router.afterEach((to, from) => {
                this.$store.commit("loading", false);
            });
        },
    };
</script>

<template lang="pug">
    div#app(v-loading="$apollo.loading").h-100
        div(v-if="error").p-2
            h1 Unknown Error
            h2 Please try again later
            p If you encounter this error on multiple occasions please report 
                a(href="https://github.com/stefanwimmer128/stefanwimmer128.eu/issues" target="_blank") here
                | .
        template(v-else)
            div.bg-dark.navbar.navbar-dark.navbar-expand-md.sticky-top
                router-link.navbar-brand(to="/") stefanwimmer128
                button.navbar-toggler(data-target="#navbar" data-toggle="collapse")
                    span.navbar-toggler-icon
                div.collapse.navbar-collapse#navbar
                    div.navbar-nav
                        template(v-for="(entry, i) in menu")
                            router-link(:key="i" :to="JSON.parse(entry.to)" v-if="entry.to").nav-item.nav-link {{entry.title}}
                            a(:href="entry.href" :key="i" target="_blank" v-if="entry.href").nav-item.nav-link {{entry.title}}
            router-view(v-loading="$store.state.loading").p-2
</template>
