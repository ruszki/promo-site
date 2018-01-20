const name = require("./generators/name");
const output = require("./generators/output");
const resolve = require("./generators/resolve");
const plugins = require("./generators/plugins");
const devtool = require("./generators/devtool");
const entry = require("./generators/entry");
const modulePack = require("./generators/module");
const target = require("./generators/target");
const externals = require("./generators/externals");

module.exports = (configType) => {
    return {
        name: name(configType),
        output: output(configType),
        resolve: resolve(configType),
        plugins: plugins(configType),
        devtool: devtool(configType),
        entry: entry(configType),
        module: modulePack(configType),
        target: target(configType),
        externals: externals(configType)
    };
};
