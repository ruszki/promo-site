const path = require("path");
const webpackConfig = require("../webpack/webpack.base.config");
const WebpackConfigType = require("../webpack/config-type");

const tsPattern = "test/app/**/*.ts";
const tsxPattern = "test/app/**/*.tsx";
const testIndexPattern = "test/index.js";

module.exports = (coverage) => {
    const files = [
        "node_modules/babel-polyfill/dist/polyfill.js"
    ];

    !coverage && files.push({
        pattern: tsPattern,
        watched: false
    });

    !coverage && files.push({
        pattern: tsxPattern,
        watched: false
    });

    coverage && files.push({
        pattern: testIndexPattern,
        watched: false
    });

    const preprocessorList = ["webpack", "sourcemap"];
    const preprocessors = !coverage ?
        {
            [tsPattern]: preprocessorList,
            [tsxPattern]: preprocessorList
        } :
        {
            [testIndexPattern]: preprocessorList
        };

    const plugins = [
        "karma-webpack",
        "karma-chrome-launcher",
        "karma-mocha",
        "karma-chai",
        "karma-sourcemap-loader"
    ];

    coverage && plugins.push("karma-coverage-istanbul-reporter");

    const webpack = webpackConfig(!coverage ? WebpackConfigType.Test : WebpackConfigType.Coverage);

    const reporters = [
        "progress"
    ];

    coverage && reporters.push("coverage-istanbul");

    return {
        basePath: path.resolve(__dirname, "../../"),
        files,
        preprocessors,
        webpack,
        plugins,
        frameworks: ["mocha", "chai"],
        browsers: ["Chrome"],
        reporters,
        mime: {
            "application / javascript": ["ts", "tsx", "js", "jsx"]
        }
    };
};
