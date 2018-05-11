<script>
    import gql from "graphql-tag";
    import moment from "moment";
    
    import markdown from "../components/markdown";
    
    export default {
        apollo: {
            blog: {
                fetchPolicy: "network-only",
                query: gql`query($offset: Int!, $limit: Int!) {
                    blog(offset: $offset, limit: $limit) {
                        date
                        message
                        title
                    }
                }`,
                variables() {
                    return {
                        offset: (this.page - 1) * this.size,
                        limit: this.size,
                    };
                },
            },
        },
        components: {
            markdown,
        },
        data: () => ({
            blog: [],
            moment,
            page: 1,
            size: 10,
        }),
        methods: {
            refresh() {
                this.$apollo.queries.blog.refetch();
            },
            updateSize(size) {
                this.size = size;
            },
        },
    };
</script>

<style lang="scss" scoped>
    div.card {
        margin: 4px 0;
    }
</style>

<template lang="pug">
    div
        h1 Blog
        div(element-loading-text="Loading..." v-loading="$apollo.loading")
            el-pagination(layout="sizes, prev, jumper, next, slot" :current-page.sync="page" :page-size="size" :page-sizes="[ 5, 10, 20 ]" @size-change="updateSize")
                el-button(@click="refresh" icon="el-icon-refresh") Refresh
            div(:key="i" v-for="(entry, i) in blog").card
                div.card-header
                    h4.card-title {{entry.title}}
                    h6.card-subtitle.text-muted ({{moment(entry.date).format("llll")}})
                markdown(:markdown="entry.message").card-body.card-text
            span(v-if="blog.length === 0") No entries available!
            el-pagination(layout="sizes, prev, jumper, next, slot" :current-page.sync="page" :page-size="size" :page-sizes="[ 5, 10, 20 ]" @size-change="updateSize")
                el-button(@click="refresh" icon="el-icon-refresh") Refresh
</template>
