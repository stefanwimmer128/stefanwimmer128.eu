import graphql from "@kocal/rollup-plugin-graphql";
import external from "@yelo/rollup-node-external";
import {
    join,
} from "path";
import babel from "rollup-plugin-babel";
import generatePackageJson from "rollup-plugin-generate-package-json";
import progress from "rollup-plugin-progress";
import resolve from "rollup-plugin-node-resolve";

import {
    devDependencies,
} from "./package.json";

export default {
    input: "./src/index.ts",
    output: {
        file: join(__dirname, "build/index.js"),
        format: "cjs",
        sourcemap: true,
    },
    plugins: [
        progress(),
        resolve({
            extensions: [
                ".js",
                ".ts",
            ],
        }),
        graphql(),
        babel({
            extensions: [
                ".js",
                ".ts",
                ".jsx",
                ".tsx",
            ],
            presets: [
                "@babel/typescript",
                [
                    "@babel/env",
                    {
                        modules: false,
                        targets: {
                            node: "8",
                        },
                    },
                ],
            ],
            plugins: [
                [
                    "@babel/proposal-decorators",
                    {
                        legacy: true,
                    },
                ],
                [
                    "@babel/proposal-class-properties",
                    {
                        loose: true,
                    },
                ],
                "@babel/proposal-object-rest-spread",
                [
                    "@babel/transform-runtime",
                    {
                        useESModules: true,
                        corejs: 3,
                    },
                ],
            ],
            runtimeHelpers: true,
        }),
        generatePackageJson({
            baseContents: {
                private: true,
                engines: {
                    node: "8",
                },
                devDependencies: {
                    "firebase-functions-test": devDependencies["firebase-functions-test"],
                },
            },
            additionalDependencies: [
                "graphql",
            ],
        }),
    ],
    external: external({
        modulesFromFile: join(__dirname, "package.json"),
    }),
    watch: {
        clearScreen: false,
    },
};
