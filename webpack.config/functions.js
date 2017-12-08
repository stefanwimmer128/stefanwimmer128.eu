import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import {
    clone,
    extend,
    keys,
    join,
    set,
} from "lodash";
import {
    EnvironmentPlugin,
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
    externals: new RegExp(`^(${join(keys(dependencies), "|")})(\/.*)?$`),
    module: {
        rules: [
            {
                test: /\.gql(\?.*)?$/,
                use: "raw-loader",
            },
            {
                test: /\.js(\?.*)?$/,
                use: __babelLoader.NODE,
            },
        ],
    },
    output: {
        filename: "index.js",
        libraryTarget: "commonjs",
        path: path("functions/"),
    },
    plugins: [
        new EnvironmentPlugin([
            "NODE_ENV",
        ]),
        new FriendlyErrorsWebpackPlugin(),
        new NoEmitOnErrorsPlugin(),
    ],
};
