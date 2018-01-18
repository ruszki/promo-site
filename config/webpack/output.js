const utils = require("./utils");
const path = require("path");

module.exports = (client, dev) => {
    return {
        filename: dev | !client ? "[name].entry.js" : "[name].[chunkhash].entry.js",
        chunkFilename: dev ? "[name].chunk.js" : client ? "[name].[chunkhash].chunk.js" : undefined,
        path: path.resolve(__dirname, "../../build/" + utils.getName(client)),
        publicPath: "/assets/"
    };
};