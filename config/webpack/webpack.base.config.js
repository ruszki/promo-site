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
    const config = {
        name: name(configType),
        resolve: resolve(configType),
        plugins: plugins(configType),
        devtool: devtool(configType),
        module: modulePack(configType),
        target: target(configType),
        externals: externals(configType)
    };

    if (!configType.isTest()) {
        config.entry = entry(configType);
        config.output = output(configType);
    }

    return config;
};
