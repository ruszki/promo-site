const cacheLoader = require("./cache-loader");
const threadLoader = require("./thread-loader");

module.exports = (configType, use, threadOptions) => {
    cacheLoader(configType, use);

    threadLoader(configType, use, threadOptions);

    use.push({
        loader: "babel-loader"
    });
};
