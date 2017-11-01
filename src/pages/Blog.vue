<script>
    import gql from "graphql-tag";
    import moment from "moment";
    
    import markdown from "../components/markdown";
    
    export default {
        apollo: {
            entries: {
                query: gql`query($from: Int!, $to: Int!) {
                    blog {
                        entries(from: $from, to: $to) {
                            date
                            message
                            title
                        }
                    }
                }`,
                skip()
                {
                    return this.length <= 0;
                },
                update: data =>
                    data.blog.entries.map(entry =>
                        ({
                            ...entry,
                            date: moment(entry.date).format("llll"),
                        }),
                    ),
                variables()
                {
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
        data: () =>
            ({
                entries: [],
                length: 0,
                page: {
                    index: 1,
                    size: 10,
                },
                pending: 0,
            }),
        methods: {
            currentChange(index)
            {
                this.page.index = index;
            },
            refresh()
            {
                this.$apollo.queries.length.refetch();
            },
            sizeChange(size)
            {
                this.page.size = size;
            },
        },
    };
</script>

<template lang="pug">
    div
        h1 Blog
        div(element-loading-text="Loading..." v-loading="pending > 0")
            el-pagination(layout="total, sizes, prev, pager, next, jumper, slot" @current-change="currentChange" :page-sizes="[ 5, 10, 20, ]" @size-change="sizeChange" :total="length")
                el-button(@click="refresh" icon="el-icon-refresh") Refresh
            div.card(:key="i" v-for="(entry, i) in entries")
                div.card-header
                    h4.card-title {{entry.title}}
                    h6.card-subtitle.text-muted ({{entry.date}})
                markdown.card-body.card-text(:markdown="entry.message")
            el-pagination(layout="total, sizes, prev, pager, next, jumper, slot" @current-change="currentChange" :page-sizes="[ 5, 10, 20, ]" @size-change="sizeChange" :total="length")
                el-button(@click="refresh" icon="el-icon-refresh") Refresh
</template>
