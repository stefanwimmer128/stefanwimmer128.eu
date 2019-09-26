<script lang="ts">
    import {
        Component,
        mixins,
    } from "@vue-decorators/all";
    
    import IsMobile from "../mixins/IsMobile";
    
    @Component({
        metaInfo: {
            title: "Projects",
        },
    })
    export default class Projects extends mixins(IsMobile) {
        get type() {
            return this.isMobile ? void 0 : "card";
        }
        
        get direction() {
            return this.isMobile ? "vertical" : "horizontal";
        }
    }
</script>

<template lang="pug">
    div
        h2 Projects
        el-carousel(:type="type" :autoplay="true" :interval="8e3" :direction="direction")
            el-carousel-item.h-auto
                el-card(shadow="hover").card.bg-dark.text-light.text-center
                    h3(slot="header") vue-decorators
                    p #[code @vue-decorators/all] - #[code @vue-decorators/apollo] - #[code @vue-decorators/types]
                    p Decorators for Vue
                    router-link(to="/projects/vue-decorator")
                        el-button(type="info") See more
            el-carousel-item.h-auto
                el-card(shadow="hover").card.bg-dark.text-light.text-center
                    h3(slot="header") MoreFood 2
                    p Bringing the next logical step from vanilla food. More food-items and a new crop on top.
                    p
                        router-link(to="/projects/morefood2")
                            el-button(type="info") See more
            el-carousel-item.h-auto
                el-card(shadow="hover").card.bg-dark.text-light.text-center
                    h3(slot="header") EasyStorage
                    p Easily store and load serializable objects, List's and Map's.
                    p
                        router-link(to="/projects/easystorage")
                            el-button(type="info") See more
            el-carousel-item.h-auto
                el-card(shadow="hover").card.bg-dark.text-light.text-center
                    h3(slot="header") @stefanwimmer128/core
                    p Complex features made easy
                    p
                        router-link(to="/projects/core")
                            el-button(type="info") See more
        router-view
</template>
