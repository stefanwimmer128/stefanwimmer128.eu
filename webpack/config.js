import autoprefixer from "autoprefixer";
import {
    browserslist,
} from "bootstrap/package.json";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {
    join,
} from "path";

export const __devServer = process.argv.some(arg =>
    arg.includes("webpack-dev-server"),
);

export function babel(functions = false) {
    return {
        loader: "babel-loader",
        options: {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                        targets: functions ? {
                            node: process.versions.node,
                        } : {
                            browsers: browserslist,
                        },
                        useBuiltIns: "entry",
                    },
                ],
                [
                    "@babel/preset-stage-0",
                    {
                        decoratorsLegacy: true,
                    },
                ],
            ],
        },
    };
}

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

export function scssLoader(fallback) {
    return [
        __devServer ? fallback : MiniCssExtractPlugin.loader,
        sourceMapLoader("css-loader", {
            importLoaders: 2,
        }),
        sourceMapLoader("postcss-loader", {
            plugins: [
                autoprefixer({
                    browsers: browserslist,
                }),
            ],
        }),
        sourceMapLoader("sass-loader", {
            outputStyle: "expanded",
        }),
    ];
}

export function sourceMapLoader(loader, options) {
    return {
        loader,
        options: Object.assign({
            sourceMap: true,
        }, options),
    };
}
