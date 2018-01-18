const path = require("path");

module.exports = (client, dev) => {
    return {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
            "@app": path.resolve(__dirname, "app"),
            "@res": path.resolve(__dirname, "resources"),
            "@img": path.resolve(__dirname, "resources/img")
        }
    };
};