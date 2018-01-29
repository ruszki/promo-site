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
        loader: "file-loader",
        options: {
            hash: "sha512",
            digest: "hex",
            name: configType.isDev() || configType.isTest() ? "[name].[ext]" : "[name].[hash].[ext]",
            publicPath: constants.publicPath,
            outputPath: "fonts/"
        }
    });

    return [
        {
            test: /\.(eot|woff|ttf|woff2)$/i,
            use
        }
    ];
};
