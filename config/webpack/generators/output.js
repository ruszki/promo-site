const path = require("path");
const constants = require("./constants");

module.exports = (configType) => {
    return {
        filename: configType.isDev() || configType.isServer() || configType.isTest() ? "[name].entry.js" : "[name].[chunkhash].entry.js",
        chunkFilename: configType.isDev() || configType.isTest() ? "[name].chunk.js" : configType.isClient() ? "[name].[chunkhash].chunk.js" : undefined,
        path: configType.isTest() ? constants.testBuildDir : configType.isClient() ? constants.clientBuildDir : constants.serverBuildDir,
        publicPath: constants.publicPath
    };
};
