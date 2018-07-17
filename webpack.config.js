const autoprefixer = require("autoprefixer");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTemplate = require("html-webpack-template");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    join,
} = require("path");
const {
    VueLoaderPlugin,
} = require("vue-loader");
const {
    EnvironmentPlugin,
    HotModuleReplacementPlugin,
    NamedModulesPlugin,
} = require("webpack");

const __devServer = exports.__devServer = process.argv.some(arg =>
    arg.includes("webpack-dev-server")
);

function sourceMapLoader(loader, options) {
    return {
        loader,
        options: Object.assign({
            sourceMap: true,
        }, options),
    };
}

function scssLoader(fallback) {
    return [
        __devServer ? fallback : MiniCssExtractPlugin.loader,
        sourceMapLoader("css-loader", {
            importLoaders: 2,
        }),
        sourceMapLoader("postcss-loader", {
            plugins: [
                autoprefixer(),
            ],
        }),
        sourceMapLoader("sass-loader", {
            outputStyle: "expanded",
        }),
    ];
}

const config = module.exports = {
    devServer: {
        contentBase: join(__dirname, "public/"),
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
                loader: "babel-loader",
                options: {
                    plugins: [
                        "@babel/plugin-transform-runtime",
                    ],
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                modules: false,
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
                loader: "file-loader",
                options: {
                    name: "[name].[ext]?[hash]",
                    outputPath: "/fonts/",
                },
                test: /\.(ttf|woff)$/,
            },
        ],
    },
    output: {
        chunkFilename: "scripts/[id].js?[chunkhash]",
        filename: "scripts/main.js",
        path: join(__dirname, "public/"),
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
};

if (config.mode === "development") {
    config.output.library = "$";
    config.output.libraryExport = "default";
    config.output.libraryTarget = "window";
}

if (__devServer) {
    config.output.filename += "?[hash]";
    config.plugins.push(
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin()
    );
} else {
    config.output.filename += "?[chunkhash]";
    config.plugins.push(
        new CleanWebpackPlugin("public/", {
            exclude: [
                "favicon.ico",
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "styles/[name].css?[contenthash]",
        })
    );
}
