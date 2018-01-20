const path = require("path");
const constants = require("./constants");

module.exports = (configType) => {
    return {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
            "@app": constants.appDir,
            "@res": path.resolve(constants.appDir, "resources"),
            "@img": path.resolve(constants.appDir, "resources/img")
        }
    };
};
