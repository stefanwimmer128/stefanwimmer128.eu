<script lang="ts">
    import gql from "graphql-tag";
    import moment from "moment";
    import marked from "marked";
    import Vue from "vue";
    import {
        Component,
        SmartQuery,
    } from "@vue-decorators/all";
    
    @Component({
        metaInfo: {
            title: "Blog",
        },
    })
    export default class Blog extends Vue {
        @SmartQuery<Blog>({
            query: gql`query {
                blog {
                    count
                }
            }`,
            update(data) {
                return data.blog.count;
            },
        })
        readonly count = 0;
        
        @SmartQuery<Blog>({
            query: gql`query($offset: Int!, $limit: Int!) {
                blog {
                    nodes(offset: $offset, limit: $limit) {
                        title
                        date
                        message
                    }
                }
            }`,
            variables() {
                return {
                    offset: (this.page - 1) * this.size,
                    limit: this.size,
                };
            },
            update(data) {
                return data.blog.nodes;
            },
        })
        readonly nodes = [];
        
        page = 1;
        size = 10;
        
        refresh() {
            this.$apollo.queries.count.refetch();
            this.$apollo.queries.nodes.refetch();
        }
        
        updateSize(size: number) {
            this.size = size;
        }
        
        formatDate(date: string) {
            return moment(date).format("llll");
        }
        
        renderMarkdown(message: string) {
            return marked(message.replace(/\\n/g, "\n"), {
                sanitize: true,
            });
        }
    }
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
            el-pagination(layout="total, sizes, prev, pager, next, slot" :total="count" :page-sizes="[ 5, 10, 20 ]" :current-page.sync="page" :page-size="size" @size-change="updateSize")
                el-button(@click="refresh" icon="el-icon-refresh") Refresh
            div(:key="i" v-for="(entry, i) in nodes").card
                div.card-header
                    h4.card-title {{entry.title}}
                    h6.card-subtitle.text-muted ({{formatDate(entry.date)}})
                div(v-html="renderMarkdown(entry.message)").card-body.card-text
            span(v-if="count === 0").ml-5.text-muted No entries available!
            el-pagination(layout="total, sizes, prev, pager, next, slot" :total="count" :page-sizes="[ 5, 10, 20 ]" :current-page.sync="page" :page-size="size" @size-change="updateSize")
                el-button(@click="refresh" icon="el-icon-refresh") Refresh
</template>
