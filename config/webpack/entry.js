const path = require("path");

module.exports = (client, dev) => {
    const entry = [];

    if (dev) {
        entry.push("react-hot-loader/patch");
        entry.push("webpack-hot-middleware/client?path=/__webpack_hmr");
    }

    entry.push("babel-polyfill");

    if (client) {
        entry.push(path.resolve(__dirname, "../../client/index.tsx"));
    } else {
        entry.push(path.resolve(__dirname, "../../server/polyfill.js"));
        entry.push(path.resolve(__dirname, "../../server/index.tsx"));
    }

    return client ? {
        main: entry
    } : {
        server: entry
    };
};