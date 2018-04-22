import Remarkable from "remarkable";

export default {
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
        tag: {
            default: "div",
            type: [
                Function,
                Object,
                String,
            ],
        },
    },
    render(createElement) {
        return createElement({
            data: () => ({
                tag: this.tag,
            }),
            template: `<component :is="tag">${this.remarkable.render(this.markdown)}</component>`,
        });
    },
};
