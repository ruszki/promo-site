const cacheLoader = require("./cache-loader");

module.exports = (configType) => {
    const use = [];

    cacheLoader(configType, use);

    use.push({
        loader: "json-loader"
    });

    return [
        {
            test: /\.json$/i,
            use
        }
    ];
};
