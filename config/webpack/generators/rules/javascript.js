const path = require("path");
const constants = require("../constants");

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
        loader: "babel-loader",
        options: {
            cacheDirectory: true
        }
    });

    const include = [];

    include.push(constants.appDir);
    configType.isServer() && include.push(constants.serverDir);
    configType.isClient() && include.push(constants.clientDir);
    configType.isTest() && include.push(constants.testDir);

    return {
        test: /\.js$/i,
        include,
        exclude: path.resolve(constants.rootDir, "node_modules"),
        use
    };
};
