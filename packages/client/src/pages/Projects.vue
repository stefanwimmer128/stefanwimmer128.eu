<script lang="ts">
    import Vue from "vue";
    import {
        Component,
    } from "vue-property-decorator";
    
    @Component({
        metaInfo: {
            title: "Projects",
        },
    })
    export default class Projects extends Vue {}
</script>

<style lang="scss" scoped>
    .card {
        text-align: center;
    }
</style>

<template lang="pug">
    div
        h1 Projects
        el-carousel(type="card" :autoplay="false")
            el-carousel-item
                el-card(shadow="hover").bg-light.text-dark.card
                    h3(slot="header") MoreFood 2
                    p Bringing the next logical step from vanilla food. More food-items and a new crop on top.
                    p
                        router-link(to="/projects/morefood2")
                            el-button(type="info") See more
            el-carousel-item
                el-card(shadow="hover").bg-light.text-dark.card
                    h3(slot="header") EasyStorage
                    p Easily store and load serializable objects, List's and Map's.
                    p
                        router-link(to="/projects/easystorage")
                            el-button(type="info") See more
            el-carousel-item
                el-card(shadow="hover").bg-light.text-dark.card
                    h3(slot="header") @stefanwimmer128/core
                    p Complex features made easy
                    p
                        router-link(to="/projects/core")
                            el-button(type="info") See more
        router-view
</template>
