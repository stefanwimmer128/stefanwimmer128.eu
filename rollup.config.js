import external from "@yelo/rollup-node-external";
import {
    join,
} from "path";
import babel from "rollup-plugin-babel";
import progress from "rollup-plugin-progress";
import resolve from "rollup-plugin-node-resolve";
import {
    string,
} from "rollup-plugin-string";

export default {
    input: "./src/server/index.js",
    output: {
        file: join(__dirname, "functions/index.js"),
        format: "cjs",
        sourcemap: true,
    },
    plugins: [
        progress(),
        resolve({
            preferBuiltins: true,
            customResolveOptions: {
                moduleDirectory: join(__dirname, "functions/node_modules"),
            },
        }),
        string({
            include: "**/*.gql",
        }),
        babel({
            exclude: "node_modules/**",
            plugins: [
                "@babel/plugin-transform-runtime",
            ],
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                        targets: {
                            node: "8",
                        },
                    },
                ],
            ],
            runtimeHelpers: true,
        }),
    ],
    external: external({
        modulesDir: join(__dirname, "functions/node_modules"),
    }),
    watch: {
        clearScreen: false,
    },
};
