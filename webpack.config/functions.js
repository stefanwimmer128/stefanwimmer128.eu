import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import {
    NoEmitOnErrorsPlugin,
} from "webpack";

import {
    dependencies,
} from "../functions/package.json";

import {
    __babelLoader,
    path,
} from "./_utils";

export default {
    devtool: "source-map",
    entry: "./src/functions",
    externals: new RegExp(`^(${Object.keys(dependencies).join("|")})(\/.*)?$`),
    module: {
        rules: [
            {
                test: /\.gql(\?.*)?$/,
                use: "raw-loader",
            },
            {
                test: /\.js(\?.*)?$/,
                use: __babelLoader,
            },
        ],
    },
    output: {
        filename: "index.js",
        libraryTarget: "commonjs",
        path: path("functions/"),
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new NoEmitOnErrorsPlugin(),
    ],
};
