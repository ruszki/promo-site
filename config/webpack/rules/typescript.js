const path = require("path");

const workerPoolTs = {
    workers: require("os").cpus().length - 1,
    name: "ts"
};

module.exports = (client, dev) => {
    const use = [];

    dev && use.push({
        loader: "cache-loader",
        options: {
            cacheDirectory: path.resolve(__dirname, "../../../.cache/webpack")
        }
    });

    use.push({
        loader: "thread-loader",
        options: workerPoolTs,
    });

    use.push({
        loader: "babel-loader",
        options: {
            cacheDirectory: true
        }
    });

    use.push({
        loader: "ts-loader",
        options: {
            happyPackMode: true,
            configFile: path.resolve(__dirname, "../../tsconfig.json")
        }
    });

    return {
        test: /\.ts(x?)$/i,
        include: [
            path.resolve(__dirname, "../../../app"),
            path.resolve(__dirname, "../../../server"),
            path.resolve(__dirname, "../../../client"),
            path.resolve(__dirname, "../../../tests")
        ],
        use
    };
};