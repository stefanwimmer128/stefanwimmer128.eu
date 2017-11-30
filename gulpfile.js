import del from "del";
import gulp from "gulp";
import webpack from "webpack-promise";

import __functions from "./webpack.config/functions";
import __public from "./webpack.config/public";

/* functions */

gulp.task("functions:clean", () =>
    del([
        "functions/index.js*"
    ]),
);

gulp.task("functions:build", () =>
    webpack(__functions),
);

gulp.task("functions", gulp.series("functions:clean", "functions:build"));

/* public */

gulp.task("public:clean", () =>
    del([
        "public/*",
        "!public/favicon.ico",
    ]),
);

gulp.task("public:build", () =>
    webpack(__public),
);

gulp.task("public", gulp.series("public:clean", "public:build"));

/* default */

gulp.task("default", gulp.series("functions", "public"));
