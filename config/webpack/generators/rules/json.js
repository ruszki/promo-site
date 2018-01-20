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

    use.push({
        loader: "json-loader"
    });

    return {
        test: /\.json$/i,
        use
    };
};
