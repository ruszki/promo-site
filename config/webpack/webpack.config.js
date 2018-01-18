const os = require("os");
const utils = require("./utils");
const output = require("./output");
const plugins = require("./plugins");
const devtool = require("./devtool");
const entry = require("./entry");
const modulePack = require("./module");

const config = (client, dev) => {
    return {
        name: utils.getName(true, dev),
        output: output(true, dev),
        resolve: resolve(true, dev),
        plugins: plugins(true, dev),
        devtool: devtool(true, dev),
        entry: entry(true, dev),
        module: modulePack(true, dev)
    };
};

module.exports = [
    (env, argv) => config(true, !env.prod),
    (env, argv) => config(false, !env.prod),
];