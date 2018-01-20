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

    use.push({
        loader: "thread-loader",
        options: workerPoolTs,
    });

    use.push({
        loader: "babel-loader",
        options: {
            cacheDirectory: true
        }
    });

    use.push({
        loader: "ts-loader",
        options: {
            happyPackMode: true,
            configFile: path.resolve(constants.configDir, "tsconfig.json")
        }
    });

    const include = [];

    include.push(constants.appDir);

    configType.isServer() && include.push(constants.serverDir);

    configType.isClient() && include.push(constants.clientDir);

    configType.isTest() && include.push(constants.testDir);

    return {
        test: /\.ts(x?)$/i,
        include,
        use
    };
};
