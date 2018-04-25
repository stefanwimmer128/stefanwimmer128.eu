import CleanWebpackPlugin from "clean-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackTemplate from "html-webpack-template";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {
    VueLoaderPlugin,
} from "vue-loader";
import {
    EnvironmentPlugin,
    HotModuleReplacementPlugin,
    NamedModulesPlugin,
} from "webpack";

import {
    __devServer,
    babel,
    fileLoader,
    path,
    scssLoader,
} from "./config";

export default (config => {
    if (config.mode === "development") {
        config.output.library = "$";
        config.output.libraryExport = "default";
        config.output.libraryTarget = "window";
    }
    
    if (__devServer) {
        config.output.filename += "?[hash]";
        config.plugins.push(
            new HotModuleReplacementPlugin(),
            new NamedModulesPlugin(),
        );
    } else {
        config.output.filename += "?[chunkhash]";
        config.plugins.push(
            new CleanWebpackPlugin("public/", {
                exclude: [
                    "favicon.ico",
                ],
                root: path(),
            }),
            new MiniCssExtractPlugin({
                filename: "styles/[name].css?[contenthash]",
            }),
        );
    }
    
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
                target: process.env.REMOTE === "true" ? "https://www.stefanwimmer128.eu" : (process.env.BACKEND_URL || "http://127.0.0.1:5000"),
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
                loader: babel(),
                test: /\.js$/,
            },
            {
                loader: "raw-loader",
                test: /\.md$/,
            },
            {
                loader: "pug-plain-loader",
                test: /\.pug$/,
            },
            {
                oneOf: [
                    {
                        loader: scssLoader("vue-style-loader"),
                        resourceQuery: /^\?vue/,
                    },
                    {
                        loader: scssLoader("style-loader"),
                    },
                ],
                test: /\.scss$/,
            },
            {
                loader: "vue-loader",
                test: /\.vue$/,
            },
            {
                loader: fileLoader("/fonts/"),
                test: /\.(ttf|woff)$/,
            },
        ],
    },
    output: {
        chunkFilename: "scripts/[id].js?[chunkhash]",
        filename: "scripts/main.js",
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
        new VueLoaderPlugin(),
    ],
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js",
        },
    },
});
