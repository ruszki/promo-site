const path = require("path");
const constants = require("../constants");
const cacheLoader = require("./cache-loader");

const fileUrlLoader = (configType, use) => {
    const fileLoader = configType.isDev() || configType.isTest();

    let loader = "file-loader";
    let options = {
        hash: "sha512",
        digest: "hex",
        publicPath: constants.publicPath,
        outputPath: "img/"
    };

    if (fileLoader) {
        options = {
            ...options,
            name: "[name].[ext]"
        };
    } else {
        options = {
            ...options,
            limit: 8192,
            name: "[name].[hash].[ext]"
        };

        loader = "url-loader";
    }

    use.push({
        loader,
        options
    });
};

const imageWebpackLoader = (configType, use) => {
    use.push({
        loader: "image-webpack-loader"
    });
};

module.exports = (configType) => {
    const use = [];

    cacheLoader(configType, use);
    fileUrlLoader(configType, use);
    imageWebpackLoader(configType, use);

    return [
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use
        }
    ];
};
