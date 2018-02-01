const constants = require("../constants");
const cacheLoader = require("./cache-loader");

module.exports = (configType) => {
    const use = [];

    cacheLoader(configType, use);

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
