const constants = require("./constants");

const filename = (configType) => configType.isDev() || configType.isServer() || configType.isTest() ?
    "[name].entry.js" :
    "[name].[chunkhash].entry.js";

const chunkFilename = (configType) => configType.isClient() && !configType.isDev() && !configType.isTest() ?
    "[name].[chunkhash].chunk.js" :
    "[name].chunk.js";

const path = (configType) => configType.isTest() ?
    constants.testBuildDir :
    configType.isClient() ?
        constants.clientBuildDir :
        constants.serverBuildDir;

module.exports = (configType) => {
    return {
        filename: filename(configType),
        chunkFilename: chunkFilename(configType),
        path: path(configType),
        publicPath: constants.publicPath
    };
};
