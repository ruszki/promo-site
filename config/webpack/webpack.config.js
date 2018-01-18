const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const os = require("os");
const utils = require("./utils");
const output = require("./output");
const resolve = require("./resolve");
const plugins = require("./plugins");
const devtool = require("./devtool");
const entry = require("./entry");
const modulePack = require("./module");
const target = require("./target");
const externals = require("./externals");
const path = require("path");
const fs = require("fs");

const buildPath = path.resolve(__dirname, "../../build");

if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
}

const config = (client, dev) => {
    return {
        name: utils.getName(client, dev),
        output: output(client, dev),
        resolve: resolve(client, dev),
        plugins: plugins(client, dev),
        devtool: devtool(client, dev),
        entry: entry(client, dev),
        module: modulePack(client, dev),
        target: target(client, dev),
        externals: externals(client, dev)
    };
};

module.exports = [
    (env, argv) => config(true, !env || !env.prod),
    (env, argv) => config(false, !env || !env.prod)
];