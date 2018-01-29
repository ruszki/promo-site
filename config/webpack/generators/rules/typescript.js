const path = require("path");
const constants = require("../constants");

const workerPoolTs = {
    workers: require("os").cpus().length - 1,
    name: "ts"
};

module.exports = (configType) => {
    const use = [];

    configType.isDev() && use.push({
        loader: "cache-loader",
        options: {
            cacheDirectory: path.resolve(constants.cacheDir, "webpack")
        }
    });

    !configType.isTest() && use.push({
        loader: "thread-loader",
        options: workerPoolTs,
    });

    use.push({
        loader: "babel-loader"
    });

    const configFilePath = "typescript/" + (
        configType.isClient() ? "tsconfig.client.json" :
            configType.isServer() ? "tsconfig.server.json" :
                configType.isTest() ? "tsconfig.test.json" : undefined
    );

    configFilePath !== undefined && use.push({
        loader: "ts-loader",
        options: {
            happyPackMode: !configType.isTest(),
            configFile: path.resolve(constants.configDir, configFilePath)
        }
    });

    const include = [];

    include.push(constants.appDir);
    configType.isServer() && include.push(constants.serverDir);
    configType.isClient() && include.push(constants.clientDir);
    configType.isTest() && include.push(constants.testDir);

    const test = /\.ts(x?)$/i;

    const rules = [];

    rules.push({
        test,
        include,
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
