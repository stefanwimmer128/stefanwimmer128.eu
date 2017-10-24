import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import {
    NoEmitOnErrorsPlugin,
} from "webpack";

import {
    dependencies as functionsExternals,
} from "../functions/package";

import {
    __babelLoader,
    path,
} from "./_utils";

export default {
    devtool: "source-map",
    entry: "./src/functions/",
    externals: Object.keys(functionsExternals).concat([
        "net",
        "path",
    ]),
    module: {
        rules: [
            {
                test: /\.gql$/,
                use: "raw-loader",
            },
            {
                test: /\.js$/,
                use: __babelLoader,
            },
        ],
    },
    output: {
        filename: "functions.js",
        libraryTarget: "commonjs",
        path: path("functions/"),
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new NoEmitOnErrorsPlugin(),
    ],
};
