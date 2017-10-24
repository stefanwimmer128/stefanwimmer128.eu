import {
    join,
} from "path";

export const __babelLoader = {
    loader: "babel-loader",
    options: {
        plugins: [
            "transform-object-rest-spread",
        ],
        presets: [
            [
                "env",
                {
                    modules: false,
                },
            ],
        ],
    },
};

export const fileLoader = path =>
    ({
        loader: "file-loader",
        options: {
            name: "[name].[ext]?[hash]",
            path,
        },
    });

export const path = (...paths) =>
    join(__dirname, "..", ...paths);

export const sourceMapLoader = loader =>
    ({
        loader,
        options: {
            sourceMap: true,
        },
    });
