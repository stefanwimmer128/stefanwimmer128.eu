<script>
    import gql from "graphql-tag";
    import {
        relative,
    } from "path";
    
    import devPanel from "./dev-panel.vue";
    
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
                    data.menu.map(item =>
                        item.to !== null ? {
                            ...item,
                            to: JSON.parse(item.to),
                        } : item,
                    ),
            },
        },
        components: {
            devPanel,
        },
    };
</script>

<template lang="pug">
    div#app
        div.bg-dark.navbar.navbar-dark.navbar-expand-md.sticky-top
            router-link.navbar-brand(to="/") stefanwimmer128
            button.navbar-toggler(data-target="#navbar" data-toggle="collapse")
                span.navbar-toggler-icon
            div.collapse.navbar-collapse#navbar
                div.navbar-nav
                    template(v-for="(entry, i) in menu")
                        router-link.nav-item.nav-link(active-class="active" :key="i" :to="entry.to" v-if="entry.to !== null") {{entry.title}}
                        a.nav-item.nav-link(:href="entry.href" :key="i" target="_blank" v-if="entry.href !== null") {{entry.title}}
        div.container-fluid
            div.row
                router-view.col.pt-2.px-2
                dev-panel.col-4(v-if="this.$store.state.devPanel")
</template>
