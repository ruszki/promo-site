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
        loader: dev ? "file-loader" : "url-loader",
        options: {
            limit: dev ? undefined : 8192
            hash: "sha512",
            digest: "hex",
            name: dev ? "[name].[ext]" : "[name].[hash].[ext]",
            publicPath: "/assets/",
            outputPath: "assets/img/"
        }
    });

    use.push({
        loader: "image-webpack-loader"
    });

    return {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use
    };
};