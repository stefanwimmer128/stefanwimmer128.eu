<script lang="ts">
    import gql from "graphql-tag";
    import moment from "moment";
    import Vue from "vue";
    import {
        Component,
    } from "vue-property-decorator";
    
    @Component({
        apollo: {
            blog: {
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
    })
    export default class Blog extends Vue {
        readonly moment = moment;
        
        private blog = [];
        private page = 1;
        private size = 10;
        
        refresh() {
            this.$apollo.queries.blog.refetch();
        }
        
        updateSize(size: number) {
            this.size = size;
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
            el-pagination(layout="sizes, prev, jumper, next, slot" :page-sizes="[ 5, 10, 20 ]" :current-page.sync="page" :page-size="size" @size-change="updateSize")
                el-button(@click="refresh" icon="el-icon-refresh") Refresh
            div(:key="i" v-for="(entry, i) in blog").card
                div.card-header
                    h4.card-title {{entry.title}}
                    h6.card-subtitle.text-muted ({{moment(entry.date).format("llll")}})
                div(:is="{ template: `<div>${entry.message}</div>` }").card-body.card-text
            span(v-if="blog.length === 0").ml-5.text-muted No entries available!
            el-pagination(layout="sizes, prev, jumper, next, slot" :page-sizes="[ 5, 10, 20 ]" :current-page.sync="page" :page-size="size" @size-change="updateSize")
                el-button(@click="refresh" icon="el-icon-refresh") Refresh
</template>
