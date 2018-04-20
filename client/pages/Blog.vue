<script>
    import gql from "graphql-tag";
    import moment from "moment";
    
    import markdown from "../components/markdown.vue";
    
    export default {
        apollo: {
            entries: {
                manual: true,
                query: gql`query($from: Int!, $to: Int!) {
                    blog {
                        entries(from: $from, to: $to, reverse: true) {
                            date
                            message
                            title
                        }
                    }
                }`,
                skip() {
                    return this.length <= 0;
                },
                result(result) {
                    if (result.data)
                        this.entries = result.data.blog.entries;
                },
                variables() {
                    return {
                        from: (this.page.index - 1) * this.page.size,
                        to: Math.min(this.page.index * this.page.size - 1, this.length - 1),
                    };
                },
            },
            length: {
                query: gql`query {
                    blog {
                        length
                    }
                }`,
                update: data =>
                    data.blog.length,
            },
        },
        components: {
            markdown,
        },
        data: () => ({
            entries: [],
            length: 0,
            page: {
                index: 1,
                size: 10,
            },
        }),
        methods: {
            currentChange(index) {
                this.page.index = index;
            },
            parseDate(date) {
                return moment(date).format("llll");
            },
            refresh() {
                this.$apollo.queries.length.refetch();
            },
            sizeChange(size) {
                this.page.size = size;
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
            el-pagination(layout="total, sizes, prev, pager, next, jumper, slot" @current-change="currentChange" :page-sizes="[ 5, 10, 20, ]" @size-change="sizeChange" :total="length")
                el-button(@click="refresh" icon="el-icon-refresh") Refresh
            template(v-if="length > 0")
                div.card(:key="i" v-for="(entry, i) in entries")
                    div.card-header
                        h4.card-title {{entry.title}}
                        h6.card-subtitle.text-muted ({{parseDate(entry.date)}})
                    markdown(:markdown="entry.message").card-body.card-text
            span(v-else) No entries available!
            el-pagination(layout="total, sizes, prev, pager, next, jumper, slot" @current-change="currentChange" :page-sizes="[ 5, 10, 20, ]" @size-change="sizeChange" :total="length")
                el-button(@click="refresh" icon="el-icon-refresh") Refresh
</template>
