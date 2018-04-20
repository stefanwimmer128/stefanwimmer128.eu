<script>
    import Remarkable from "remarkable";
    
    export default {
        computed: {
            component()
            {
                return {
                    template: `<div>${this.remarkable.render(this.markdown)}</div>`,
                };
            },
        },
        props: {
            markdown: {
                required: true,
                type: String,
            },
            remarkable: {
                default: () =>
                    new Remarkable(),
                validator: value =>
                    value instanceof Remarkable,
            },
        },
    };
</script>

<template lang="pug">
    component(:is="component")
</template>
