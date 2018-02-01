const path = require("path");
const constants = require("../constants");
const scriptInclude = require("./script-include");
const scriptUse = require("./script-use");

const workerPoolJs = {
    workers: Math.max(Math.floor(require("os").cpus().length / 2), 1),
    name: "js"
};

module.exports = (configType) => {
    const use = [];

    scriptUse(configType, use, workerPoolJs);

    return [
        {
            test: /\.js$/i,
            include: scriptInclude(configType),
            exclude: path.resolve(constants.rootDir, "node_modules"),
            use
        }
    ];
};
