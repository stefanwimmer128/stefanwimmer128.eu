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
        historyApiFallback: true,
        hot: true,
        proxy: {
            "/graphql": "http://127.0.0.1:5000",
            "/graphiql": "http://127.0.0.1:5000",
        },
    },
    devtool: "source-map",
    entry: [
        "babel-polyfill",
        "./src/main",
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: sourceMapLoader("style-loader"),
                    use: [
                        sourceMapLoader("css-loader"),
                    ],
                }),
            },
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: __babelLoader,
            },
            {
                test: /\.md$/,
                use: "raw-loader",
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: sourceMapLoader("style-loader"),
                    use: [
                        sourceMapLoader("css-loader"),
                        sourceMapLoader("sass-loader"),
                    ],
                }),
            },
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            js: __babelLoader,
                            scss: ExtractTextWebpackPlugin.extract({
                                fallback: sourceMapLoader("vue-style-loader"),
                                use: [
                                    sourceMapLoader("css-loader"),
                                    sourceMapLoader("sass-loader"),
                                ],
                            }),
                        },
                    },
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: fileLoader("fonts/"),
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                use: fileLoader("images/"),
            },
        ],
    },
    output: Object.assign({
        filename: "main.js?[hash]",
        path: path("public/"),
    }, process.env.NODE_ENV === "development" ? {
        library: "app",
        libraryExport: "default",
        libraryTarget: "window",
    } : {}),
    plugins: [
        new EnvironmentPlugin([
            "NODE_ENV",
        ]),
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            appMountId: "mount",
            baseHref: "/",
            inject: false,
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
