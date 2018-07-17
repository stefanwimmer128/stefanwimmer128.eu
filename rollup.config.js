import externals from "@yelo/rollup-node-external";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import string from "rollup-plugin-string";

export default {
    input: "./server/index.js",
    output: {
        file: "functions/index.js",
        format: "cjs",
        sourcemap: true,
    },
    plugins: [
        resolve(),
        string({
            include: "**/*.gql",
        }),
        babel({
            plugins: [
                "@babel/plugin-transform-runtime"
            ],
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                        targets: {
                            node: process.versions.node,
                        },
                    },
                ],
                [
                    "@babel/preset-stage-0",
                    {
                        decoratorsLegacy: true,
                    },
                ],
            ],
            runtimeHelpers: true,
        }),
        replace({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    external: externals({
        modulesDir: "functions/node_modules",
    }),
};
