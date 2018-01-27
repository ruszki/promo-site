const path = require("path");
const baseConfig = require("./webpack/webpack.base.config");
const ConfigType = require("./webpack/config-type");

module.exports = function(config) {
    config.set({
        basePath: path.resolve(__dirname, "../"),
        files: [
            "node_modules/babel-polyfill/dist/polyfill.js",
            {
                pattern: "test/**/*.ts",
                watched: false
            },
            {
                pattern: "test/**/*.tsx",
                watched: false
            }
        ],
        preprocessors: {
            "test/**/*.ts": ["webpack", "sourcemap"],
            "test/**/*.tsx": ["webpack", "sourcemap"]
        },
        webpack: baseConfig(ConfigType.Test),
        plugins: [
            "karma-webpack",
            "karma-chrome-launcher",
            "karma-mocha",
            "karma-chai",
            "karma-sourcemap-loader"
        ],
        frameworks: ["mocha", "chai"],
        browsers: ["Chrome"],
        reporters: ["progress"],
        mime: {
            "application / javascript": ["ts", "tsx", "js", "jsx"]
        }
    });
};
