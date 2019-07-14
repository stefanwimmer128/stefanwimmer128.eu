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
    }
</script>

<style lang="scss" scoped>
    .page-item.page-link:not(.disabled) {
        cursor: pointer;
    }
</style>

<template lang="pug">
    div.d-flex.d-flex-row
        span.align-self-center.mx-2.text-white-50 Total {{total}}
        div.align-self-center.mx-2.pagination.pagination-sm
            span(@click="current > 1 && $emit('change-page', current - 1)" :class="{ 'disabled': current <= 1, 'text-white-50': current <= 1, 'text-light': current > 1 }").bg-dark.el-icon-arrow-left.page-item.page-link.rounded-left
            span(v-for="page in pages" @click="$emit('change-page', page)" :class="{ 'text-primary': page === current, 'text-light': page !== current }").bg-dark.page-item.page-link {{page}}
            span(@click="current < pages && $emit('change-page', current + 1)" :class="{ 'disabled': current >= pages, 'text-white-50': current >= pages, 'text-light': current < pages }").bg-dark.el-icon-arrow-right.page-item.page-link.rounded-right
        div.align-self-center.mx-2
            slot
</template>
