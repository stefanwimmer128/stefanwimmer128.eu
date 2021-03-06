import prettyhtml from "@starptech/prettyhtml";
import {
    CleanWebpackPlugin,
} from "clean-webpack-plugin";
import ExtractCssChunksWebpackPlugin from "extract-css-chunks-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import {
    readFileSync,
} from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackTemplate from "html-webpack-template";
import MomentLocalesWebpackPlugin from "moment-locales-webpack-plugin";
import {
    join,
    relative,
} from "path";
import PrerenderSPAPlugin, {
    PuppeteerRenderer,
} from "prerender-spa-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import {
    VueLoaderPlugin,
} from "vue-loader";
import {
    BannerPlugin,
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
        target: (backend => {
            if (backend)
                if (backend === "local")
                    return "http://0.0.0.0:5000/";
                else if (backend !== "remote")
                    return backend;
            return "https://www.stefanwimmer128.eu/";
        })(process.env.BACKEND),
        changeOrigin: true,
    },
];

let htmlSettings = (filename = "index.html") => ({
    filename,
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
});

const config = {
    entry: "./src/index.ts",
    mode: __mode,
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                loaders: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/typescript",
                                    {
                                        allExtensions: true,
                                        isTSX: true,
                                    },
                                ],
                                [
                                    "@babel/env",
                                    {
                                        modules: false,
                                    },
                                ],
                                "@vue/jsx",
                            ],
                            plugins: [
                                "@babel/syntax-dynamic-import",
                                "transform-typescript-metadata",
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
                                        useESModules: false,
                                        corejs: 3,
                                    },
                                ],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                loader: [
                    ExtractCssChunksWebpackPlugin.loader,
                    sourceMapLoader("css-loader", {
                        importLoaders: 3,
                    }),
                    sourceMapLoader("postcss-loader"),
                    sourceMapLoader("resolve-url-loader"),
                    sourceMapLoader("sass-loader", {
                        outputStyle: "nested",
                    }),
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
        extensions: [
            ".js",
            ".ts",
            ".jsx",
            ".tsx",
        ],
        alias: {
            "vue$": "vue/dist/vue.esm.js",
        },
    },
    output: {
        path: join(__dirname, "public"),
        filename: `scripts/main.js${__hash}`,
        chunkFilename: `scripts/[name].js${__hash}`,
        publicPath: "/",
        
        library: __mode === "development" ? "$vm" : void 0,
        libraryExport: "default",
        
        devtoolModuleFilenameTemplate(info) {
            return `webpack:///${relative(join(__dirname, "../.."), info.absoluteResourcePath)}`;
        },
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(__mode),
        }),
        new VueLoaderPlugin(),
        new MomentLocalesWebpackPlugin(),
        new ExtractCssChunksWebpackPlugin({
            filename: `styles/main.css${__hash}`,
            chunkFilename: `styles/[name].css${__hash}`,
            hot: __devServer,
        }),
        new HtmlWebpackPlugin(htmlSettings()),
        new BannerPlugin(readFileSync(join(__dirname, "../../LICENSE"), {
            encoding: "utf-8",
        })),
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
                    chunks: "async",
                    name(module, chunk, cacheGroupKey) {
                        return `vendors/${chunk.map(x => x.name.replace(/\//g, ".")).join("~")}`;
                    },
                    enforce: true,
                },
                vendorsInitial: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendors/main",
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
        new HtmlWebpackPlugin(htmlSettings("404.html")),
        new PrerenderSPAPlugin({
            staticDir: join(__dirname, "public"),
            routes: [
                "/",
                "/about",
                "/blog",
                "/projects",
                "/projects/vue-decorators",
                "/projects/morefood2",
                "/projects/easystorage",
                "/projects/core",
            ],
            server: {
                proxy,
            },
            renderer: new PuppeteerRenderer({
                inject: true && process.env.SPA !== "false",
                renderAfterDocumentEvent: "prerender",
                headless: false,
                devtools: true,
                args: [
                    "--start-maximized",
                ],
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
