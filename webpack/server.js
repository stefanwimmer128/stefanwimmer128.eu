import CleanWebpackPlugin from "clean-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import nodeExternals from "webpack-node-externals";

import {
    babel,
    path,
} from "./config";

export default {
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
