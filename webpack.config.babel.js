import prettyhtml from "@starptech/prettyhtml";
import CleanWebpackPlugin from "clean-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackTemplate from "html-webpack-template";
import ExtractCssChunksWebpackPlugin from "extract-css-chunks-webpack-plugin";
import {
    join,
} from "path";
import PrerenderSPAPlugin, {
    PuppeteerRenderer,
} from "prerender-spa-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import {
    VueLoaderPlugin,
} from "vue-loader";
import {
    DefinePlugin,
    HotModuleReplacementPlugin,
    NamedModulesPlugin,
} from "webpack";

const __devServer = process.argv.some(arg =>
    arg.includes("webpack-dev-server")
);
const __mode = ! __devServer && process.env.NODE_ENV ? process.env.NODE_ENV : "development";

function sourceMapLoader(loader, options) {
    return {
        loader,
        options: Object.apply({
            sourceMap: true,
        }, options),
    };
}

const __hash = __devServer ? "" : "?[contenthash]";

const proxy = [
    {
        context: [
            "/graphql",
        ],
        target: process.env.BACKEND == "remote" ? "https://www.stefanwimmer128.eu" : process.env.BACKEND || "https://0.0.0.0:5000",
        changeOrigin: true,
    },
];

const config = {
    entry: "./src/client/index.js",
    mode: __mode,
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    plugins: [
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-transform-runtime",
                    ],
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                modules: false,
                                useBuiltIns: "entry",
                            },
                        ],
                    ],
                },
            },
            {
                test: /\.scss$/,
                oneOf: [
                    {
                        resourceQuery: /^\?vue/,
                        loader: [
                            ExtractCssChunksWebpackPlugin.loader,
                            sourceMapLoader("css-loader", {
                                importLoaders: 2,
                            }),
                            sourceMapLoader("postcss-loader"),
                            sourceMapLoader("sass-loader", {
                                outputStyle: "expanded",
                            }),
                        ],
                    },
                    {
                        loader: [
                            ExtractCssChunksWebpackPlugin.loader,
                            sourceMapLoader("css-loader", {
                                importLoaders: 2,
                            }),
                            sourceMapLoader("postcss-loader"),
                            sourceMapLoader("sass-loader", {
                                outputStyle: "expanded",
                            }),
                        ],
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.pug$/,
                resourceQuery: /^\?vue/,
                loader: "pug-plain-loader",
            },
            {
                test: /\.(ttf|woff)$/,
                loader: "file-loader",
                options: {
                    name: `[name].[ext]${__hash}`,
                    outputPath: "fonts/",
                },
            },
        ],
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js",
        },
    },
    output: {
        path: join(__dirname, "public"),
        filename: `scripts/main.js${__hash}`,
        chunkFilename: `scripts/[name].js${__hash}`,
        publicPath: "/",
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(__mode),
        }),
        new VueLoaderPlugin(),
        new ExtractCssChunksWebpackPlugin({
            filename: `styles/main.css${__hash}`,
            chunkFilename: `styles/[name].css${__hash}`,
            hot: __devServer,
        }),
        new HtmlWebpackPlugin({
            template: HtmlWebpackTemplate,
            inject: false,
            
            appMountId: "app",
            title: "stefanwimmer128", 
            favicon: "assets/favicon.ico",
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1, shrink-to-fit=no",
                },
            ],
        }),
    ],
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
        ],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendors",
                    enforce: true,
                },
            },
        },
    },
    devServer: {
        contentBase: join(__dirname, "public"),
        historyApiFallback: true,
        hot: true,
        host: "0.0.0.0",
        disableHostCheck: true,
        proxy,
    },
};

if (__devServer) {
    config.plugins.push(
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin(),
    );
} else {
    config.plugins.push(
        new CleanWebpackPlugin(),
        new PrerenderSPAPlugin({
            staticDir: join(__dirname, "public"),
            routes: [
                "/",
                "/about",
                "/projects",
            ],
            server: {
                proxy,
            },
            renderer: new PuppeteerRenderer({
                inject: true,
                renderAfterDocumentEvent: "prerender",
                headless: false,
                devtools: true,
            }),
            postProcess(context) {
                context.html = prettyhtml(context.html, {
                    tabWidth: 4,
                }).toString();
                return context;
            },
        }),
    );
}

export default config;
