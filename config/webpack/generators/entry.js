const path = require("path");
const constants = require("./constants");

module.exports = (configType) => {
    const entry = [];

    if (configType.isDev()) {
        entry.push("react-hot-loader/patch");
        entry.push("webpack-hot-middleware/client?path=/__webpack_hmr");
    }

    !configType.isTest() && entry.push("babel-polyfill");

    if (configType.isClient()) {
        entry.push(path.resolve(constants.clientDir, "index.tsx"));
    } else if (configType.isServer()) {
        entry.push(path.resolve(constants.serverDir, "index.tsx"));
    }

    return configType.isClient() ? {
        main: entry
    } : {
        server: entry
    };
};
