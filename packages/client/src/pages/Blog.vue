<script lang="ts">
    import gql from "graphql-tag";
    import moment from "moment";
    import marked from "marked";
    import {
        Component,
        SmartQuery,
        mixins,
    } from "@vue-decorators/all";
    
    import Loading from "../components/Loading.vue";
    import Pagination from "../components/Pagination.vue";
    
    import IsPrerender from "../mixins/IsPrerender";
    
    type BlogCountResult = {
        blog: {
            count: number;
        };
    };
    
    type BlogNode = {
        title: string;
        date: string;
        message: string;
    };
    type BlogNodesResult = {
        blog: {
            nodes: BlogNode[];
        };
    };
    type BlogNodesVariables = {
        offset: number;
        limit: number;
    };
    
    @Component({
        metaInfo: {
            title: "Blog",
        },
        components: {
            Loading,
            Pagination,
        },
    })
    export default class Blog extends mixins(IsPrerender) {
        @SmartQuery<Blog, number, BlogCountResult>({
            query: gql`query {
                blog {
                    count
                }
            }`,
            update(data) {
                return data.blog.count;
            },
            skip() {
                return this.isPrerender;
            },
        })
        readonly count = 0;
        
        @SmartQuery<Blog, BlogNode[], BlogNodesResult, BlogNodesVariables>({
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
            skip() {
                return this.isPrerender;
            },
        })
        readonly nodes = [];
        
        get page() {
            return parseInt(this.$route.query.page as string) || 1;
        }
        
        get size() {
            return parseInt(this.$route.query.size as string) || 10;
        }
        
        refresh() {
            this.$apollo.queries.count.refetch();
            this.$apollo.queries.nodes.refetch();
        }
        
        updateSize(size: number) {
            this.$router.push({
                query: {
                    page: this.page.toString(),
                    size: size.toString(),
                },
            });
        }
        
        updatePage(page: number) {
            this.$router.push({
                query: {
                    page: page.toString(),
                    size: this.size.toString(),
                },
            });
        }
        
        formatDate(date: string) {
            return moment(date).format("llll");
        }
        
        renderMarkdown(message: string) {
            return marked(message.replace(/\\n/g, "\n"));
        }
    }
</script>

<template lang="pug">
    div
        h2 Blog
        loading(:loading="$apollo.queries.count.loading" v-if="! isPrerender")
            i(v-if="count === 0").text-white-50 No entries available!
            template(v-else)
                pagination(:total="count" :size="size" :current="page" @change-page="updatePage").justify-content-center
                    el-button(type="text" icon="el-icon-refresh" @click="refresh").text-info Refresh
                loading(:loading="$apollo.queries.nodes.loading")
                    div(:key="i" v-for="(entry, i) in nodes").card.my-2.bg-secondary
                        div.card-header
                            h4.card-title {{entry.title}}
                            h6.card-subtitle.text-white-50 ({{formatDate(entry.date)}})
                        div(v-html="renderMarkdown(entry.message)").card-body.card-text
                pagination(:total="count" :size="size" :current="page" @change-page="updatePage").justify-content-center
                    el-button(type="text" icon="el-icon-refresh" @click="refresh").text-info Refresh
</template>
