import del from "del";
import gulp from "gulp";
import webpack from "webpack-promise";

import webpackConfig_functions from "./webpack.config/functions";
import webpackConfig_public from "./webpack.config/public";

/* functions */

gulp.task("functions:clean", () =>
    del([
        "functions/functions.js*",
    ]),
);

gulp.task("functions:build", () =>
    webpack(webpackConfig_functions),
);

gulp.task("functions", gulp.series("functions:clean", "functions:build"));

/* public */

gulp.task("public:clean", () =>
    del([
        "public/**",
    ]),
);

gulp.task("public:build", () =>
    webpack(webpackConfig_public),
);

gulp.task("public", gulp.series("public:clean", "public:build"));

/* default */

gulp.task("default", gulp.series("functions", "public"));
