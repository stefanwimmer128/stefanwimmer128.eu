import CleanWebpackPlugin from "clean-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";

import {
    dependencies,
} from "../functions/package.json";

import {
    babel,
    path,
} from "./config";

export default {
    devtool: "source-map",
    entry: "./server",
    externals: new RegExp(`^(${Object.keys(dependencies).join("|")})(\/.*)?$`),
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.gql(\?\S*)?$/,
                use: "raw-loader",
            },
            {
                test: /\.js(\?\S*)?$/,
                use: babel(),
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
};
