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
        loader: "json-loader"
    });

    return {
        test: /\.json$/i,
        use
    };
};