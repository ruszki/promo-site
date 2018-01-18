const path = require("path");

module.exports = (client, dev) => {
    const use = [];

    dev && use.push({
        loader: "cache-loader",
        options: {
            cacheDirectory: path.resolve(__dirname, "../../../.cache/webpack")
        }
    });

    use.push({
        loader: "file-loader",
        options: {
            hash: "sha512",
            digest: "hex",
            name: dev ? "[name].[ext]" : "[name].[hash].[ext]",
            publicPath: "/assets/",
            outputPath: "fonts/"
        }
    });

    return {
        test: /\.(eot|woff|ttf|woff2)$/i,
        use
    };
};