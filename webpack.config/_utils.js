import {
    join,
} from "path";

export const __babelLoader = {
    loader: "babel-loader",
    options: {
        presets: [
            [
                "@babel/preset-env",
                {
                    modules: false,
                    shippedProposals: true,
                },
            ],
        ],
    },
};

export const fileLoader = outputPath =>
    ({
        loader: "file-loader",
        options: {
            name: "[name].[ext]?[hash]",
            outputPath,
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
