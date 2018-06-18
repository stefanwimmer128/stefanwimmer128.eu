const CleanWebpackPlugin = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const {
    babel,
    path,
} = require("./config");

module.exports = {
    devtool: "source-map",
    entry: "./server",
    externals: [
        nodeExternals({
            modulesDir: path("functions/node_modules"),
        }),
    ],
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.gql(\?\S*)?$/,
                use: "raw-loader",
            },
            {
                test: /\.js(\?\S*)?$/,
                use: babel(true),
            },
        ],
    },
    output: {
        filename: "index.js",
        libraryTarget: "commonjs",
        path: path("functions/"),
    },
    plugins: [
        new CleanWebpackPlugin([
            "functions/index.js*"
        ], {
            root: path(),
        }),
        new FriendlyErrorsWebpackPlugin(),
    ],
    target: "node",
};
