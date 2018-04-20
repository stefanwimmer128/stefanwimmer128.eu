import autoprefixer from "autoprefixer";
import {
    browserslist,
} from "bootstrap/package.json";
import ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
import {
    join,
} from "path";

export function babel() {
    return {
        loader: "babel-loader",
        options: {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            browsers: browserslist,
                        },
                        modules: false,
                    },
                ],
                "@babel/preset-stage-0",
            ],
        },
    };
}

export function fileLoader(outputPath) {
    return {
        loader: "file-loader",
        options: {
            name: "[name].[ext]?[hash]",
            outputPath,
        },
    };
}

export function path(...path) {
    return join(__dirname, "../", ...path);
}

export function postcss() {
    return [
        autoprefixer({
            browsers: browserslist,
        }),
    ];
}

export function scssLoader(fallback, vue = false) {
    return ExtractTextWebpackPlugin.extract({
        fallback,
        use: [
            sourceMapLoader("css-loader", {
                importLoaders: vue ? 1 : 2,
            }),
            ...(vue ? [] : [sourceMapLoader("postcss-loader", {
                plugins: postcss(),
            })]),
            sourceMapLoader("sass-loader", {
                outputStyle: "expanded",
            }),
        ],
    });
}

export function sourceMapLoader(loader, options) {
    return {
        loader,
        options: Object.assign({
            sourceMap: true,
        }, options),
    };
}
