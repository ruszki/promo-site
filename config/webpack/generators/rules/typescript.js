const path = require("path");
const constants = require("../constants");
const scriptInclude = require("./script-include");
const scriptUse = require("./script-use");

const workerPoolTs = {
    workers: require("os").cpus().length - 1,
    name: "ts"
};

module.exports = (configType) => {
    const use = [];

    scriptUse(configType, use, workerPoolTs);

    const configFilePath = "typescript/" + (
        configType.isClient() ? "tsconfig.client.json" :
            configType.isServer() ? "tsconfig.server.json" :
                "tsconfig.test.json"
    );

    use.push({
        loader: "ts-loader",
        options: {
            happyPackMode: !configType.isTest(),
            configFile: path.resolve(constants.configDir, configFilePath)
        }
    });

    const test = /\.ts(x?)$/i;

    const rules = [];

    rules.push({
        test,
        include: scriptInclude(configType),
        exclude: path.resolve(constants.rootDir, "node_modules"),
        use
    });

    configType.isCoverage() && rules.push({
        test,
        use: {
            loader: "istanbul-instrumenter-loader",
            options: {
                esModules: true,
                produceSourceMap: true
            }
        },
        enforce: "post",
        include: constants.appDir,
        exclude: path.resolve(constants.rootDir, "node_modules"),
    });

    return rules;
};
