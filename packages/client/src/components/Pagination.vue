<script lang="ts">
    import {
        Component,
        Prop,
        Vue,
    } from "@vue-decorators/all";
    
    @Component
    export default class Pagination extends Vue {
        @Prop({
            required: true,
        })
        readonly current!: number;
        
        @Prop({
            required: true,
        })
        readonly total!: number;
        
        @Prop({
            default: 10,
        })
        readonly size!: number;
        
        get pages() {
            return Math.ceil(this.total / this.size);
        }
        
        get hasPrev() {
            return this.current > 1;
        }
        
        get hasNext() {
            return this.current < this.pages;
        }
        
        classesControls(active) {
            return {
                "disabled": ! active,
                "text-white-50": ! active,
                "text-light": active,
            };
        }
        
        classesPage(page) {
            return {
                "text-primary": page === this.current,
                "text-light": page !== this.current,
            };
        }
        
        goto(page) {
            if (page >= 1 && page <= this.pages)
            this.$emit("change-page", page);
        }
    }
</script>

<style lang="scss" scoped>
    .page-item.page-link:not(.disabled) {
        cursor: pointer;
    }
</style>

<template lang="pug">
    div.d-flex.d-flex-row
        span.mx-2.align-self-center.text-white-50 Total {{total}}
        div.mx-2.align-self-center.pagination.pagination-sm
            span(@click="goto(current - 1)" :class="classesControls(hasPrev)").page-item.page-link.bg-dark.rounded-left.el-icon-arrow-left
            span(v-for="page in pages" @click="goto(page)" :class="classesPage(page)").page-item.page-link.bg-dark {{page}}
            span(@click="goto(current + 1)" :class="classesControls(hasNext)").page-item.page-link.bg-dark.rounded-right.el-icon-arrow-right
        div.mx-2.align-self-center
            slot
</template>
