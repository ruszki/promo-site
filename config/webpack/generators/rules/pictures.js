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
        loader: configType.isDev() || configType.isTest() ? "file-loader" : "url-loader",
        options: {
            limit: configType.isDev() || configType.isTest() ? undefined : 8192,
            hash: "sha512",
            digest: "hex",
            name: configType.isDev() || configType.isTest() ? "[name].[ext]" : "[name].[hash].[ext]",
            publicPath: constants.publicPath,
            outputPath: "img/"
        }
    });

    use.push({
        loader: "image-webpack-loader"
    });

    return [
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use
        }
    ];
};
