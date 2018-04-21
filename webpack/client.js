import CleanWebpackPlugin from "clean-webpack-plugin";
import ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackTemplate from "html-webpack-template";
import {
    EnvironmentPlugin,
    HotModuleReplacementPlugin,
    NamedModulesPlugin,
} from "webpack";

import {
    babel,
    fileLoader,
    path,
    postcss,
    scssLoader,
} from "./config";

export default (config => {
    if (config.mode === "development") {
        config.output.library = "$";
        config.output.libraryExport = "default";
        config.output.libraryTarget = "window";
    }
    
    if (process.argv.some(arg =>
        arg.includes("webpack-dev-server"),
    ))
        config.plugins.push(
            new ExtractTextWebpackPlugin({
                disable: true,
            }),
            new HotModuleReplacementPlugin(),
            new NamedModulesPlugin(),
        );
    else
        config.plugins.push(
            new CleanWebpackPlugin("public/", {
                exclude: [
                    "favicon.ico",
                ],
                root: path(),
            }),
            new ExtractTextWebpackPlugin({
                allChunks: true,
                filename: "style.css?[hash]",
            }),
        );
    
    return config;
})({
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
    entry: "./client",
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: babel(),
            },
            {
                test: /\.md$/,
                use: "raw-loader",
            },
            {
                test: /\.scss$/,
                use: scssLoader("style-loader"),
            },
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            js: babel(),
                            scss: scssLoader("vue-style-loader", true),
                        },
                        postcss: postcss(),
                    },
                },
            },
            {
                test: /\.(ttf|woff)$/,
                use: fileLoader("fonts/"),
            },
        ],
    },
    output: {
        chunkFilename: "script.[id].js?[chunkhash]",
        filename: "script.js?[chunkhash]",
        path: path("public/"),
    },
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
    ],
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js",
        },
    },
});
