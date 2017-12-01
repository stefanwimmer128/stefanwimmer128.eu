import ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackTemplate from "html-webpack-template";
import {
    EnvironmentPlugin,
    HotModuleReplacementPlugin,
    NamedModulesPlugin,
    NoEmitOnErrorsPlugin,
    ProvidePlugin,
} from "webpack";

import {
    __babelLoader,
    fileLoader,
    path,
    sourceMapLoader,
} from "./_utils";

export default {
    devServer: {
        contentBase: path("public/"),
        historyApiFallback: true,
        hot: true,
        proxy: [
            {
                changeOrigin: true,
                context: [
                    "/graphiql",
                    "/graphql",
                ],
                target: process.env.BACKEND_URL || "http://127.0.0.1:5000",
            },
        ],
    },
    devtool: "source-map",
    entry: "./src",
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js(\?\S*)?$/,
                use: __babelLoader,
            },
            {
                test: /\.md(\?\S*)?$/,
                use: "raw-loader",
            },
            {
                test: /\.scss(\?\S*)?$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: sourceMapLoader("style-loader"),
                    use: [
                        sourceMapLoader("css-loader"),
                        sourceMapLoader("postcss-loader"),
                        sourceMapLoader("sass-loader"),
                    ],
                }),
            },
            {
                test: /\.vue(\?\S*)?$/,
                use: {
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            js: __babelLoader,
                            scss: ExtractTextWebpackPlugin.extract({
                                fallback: sourceMapLoader("vue-style-loader"),
                                use: [
                                    sourceMapLoader("css-loader"),
                                    sourceMapLoader("postcss-loader"),
                                    sourceMapLoader("sass-loader"),
                                ],
                            }),
                        },
                    },
                },
            },
            {
                test: /\.(ttf|woff)(\?\S*)?$/,
                use: fileLoader("fonts/"),
            },
        ],
    },
    output: Object.assign({
        filename: "main.js?[hash]",
        path: path("public/"),
    }, process.env.NODE_ENV === "development" ? {
        library: "$",
        libraryExport: "default",
        libraryTarget: "window",
    } : {}),
    plugins: [
        new EnvironmentPlugin([
            "NODE_ENV",
        ]),
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            appMountId: "app",
            baseHref: "/",
            inject: false,
            meta: [
                {
                    content: "width=device-width, initial-scale=1, shrink-to-fit=no",
                    name: "viewport",
                },
            ],
            template: HtmlWebpackTemplate,
            title: "stefanwimmer128",
        }),
        new NoEmitOnErrorsPlugin(),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Popper: [
                "popper.js",
                "default",
            ],
        }),
        ...(process.argv.some(arg =>
            arg.includes("webpack-dev-server"),
        ) ? [
            new ExtractTextWebpackPlugin({
                disable: true,
            }),
            new HotModuleReplacementPlugin(),
            new NamedModulesPlugin(),
        ] : [
            new ExtractTextWebpackPlugin("style.css?[hash]"),
        ]),
    ],
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js",
        },
        extensions: [
            ".js",
            ".vue",
        ],
    },
};
