<script>
    import markdown from "../components/markdown";
    
    import template from "./About.md";
    
    export default {
        components: {
            markdown,
        },
        data: () => ({
            template,
        }),
    };
</script>

<template lang="pug">
    markdown(:markdown="template")
</template>
