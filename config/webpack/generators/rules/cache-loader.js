const path = require("path");
const constants = require("../constants");

module.exports = (configType, use) => {
    if (configType.isDev()) {
        use.push({
            loader: "cache-loader",
            options: {
                cacheDirectory: path.resolve(constants.cacheDir, "webpack")
            }
        });
    }
};
