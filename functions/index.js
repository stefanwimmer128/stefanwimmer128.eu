const functions = require("./functions");

for (const key in functions)
    if (key !== "__esModule")
        exports[key] = functions[key];

