import {
    extend,
} from "lodash";
import {
    join,
} from "path";

export const __babelLoader = {
    NODE: {
        loader: "babel-loader",
        options: {
            babelrc: false,
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                        shippedProposals: true,
                        targets: {
                            node: process.versions.node,
                        },
                        useBuiltIns: "usage",
                    },
                ],
            ],
        },
    },
    PUBLIC: {
        loader: "babel-loader",
        options: {
            babelrc: false,
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                        shippedProposals: true,
                    },
                ],
            ],
        },
    },
};

export function fileLoader(outputPath) {
    return {
        loader: "file-loader",
        options: {
            name: "[name].[ext]?[hash]",
            outputPath,
        },
    };
}

export function path(...path) {
    return join(__dirname, "../", ...path);
}

export function sourceMapLoader(loader, options = {}) {
    return {
        loader,
        options: extend({
            sourceMap: true,
        }, options),
    };
}
