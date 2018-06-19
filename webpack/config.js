const autoprefixer = require("autoprefixer");
const {
    browserslist,
} = require("bootstrap/package.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    join,
} = require("path");

const __devServer = exports.__devServer = process.argv.some(arg =>
    arg.includes("webpack-dev-server")
);

const babel = exports.babel = function babel(functions = false) {
    return {
        loader: "babel-loader",
        options: {
            plugins: [
                [
                    "@babel/plugin-transform-runtime",
                    {
                        helpers: true,
                        polyfill: functions,
                        regenerator: functions,
                    },
                ],
            ],
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                        targets: functions ? {
                            node: process.versions.node,
                        } : void 0,
                        useBuiltIns: functions ? void 0 : "entry",
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

const fileLoader = exports.fileLoader = function fileLoader(outputPath) {
    return {
        loader: "file-loader",
        options: {
            name: "[name].[ext]?[hash]",
            outputPath,
        },
    };
}

const path = exports.path = function path(...path) {
    return join(__dirname, "../", ...path);
}

const sccsLoader = exports.scssLoader = function scssLoader(fallback) {
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

const sourceMapLoader = exports.sourceMapLoader = function sourceMapLoader(loader, options) {
    return {
        loader,
        options: Object.assign({
            sourceMap: true,
        }, options),
    };
}
