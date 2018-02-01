const path = require("path");
const constants = require("./constants");

const hotLoader = (configType, entry) => {
    if (configType.isDev()) {
        entry.push("react-hot-loader/patch");
        entry.push("webpack-hot-middleware/client?path=/__webpack_hmr");
    }
};

const babel = (configType, entry) => {
    if (!configType.isTest()) {
        entry.push("babel-polyfill");
    }
};

const mainEntry = (configType, entry) => {
    if (configType.isClient()) {
        entry.push(path.resolve(constants.clientDir, "index.tsx"));
    } else if (configType.isServer()) {
        entry.push(path.resolve(constants.serverDir, "index.tsx"));
    }
};

const entryObject = (configType, entry) => {
    if (configType.isClient()) {
        return {
            main: entry
        };
    } else {
        return {
            server: entry
        };
    }
};

module.exports = (configType) => {
    const entry = [];

    hotLoader(configType, entry);
    babel(configType, entry);
    mainEntry(configType, entry);

    return entryObject(configType, entry);
};
