const path = require("path");

module.exports = (client, dev) => {
    return client ? {
        main: ["babel-polyfill", path.resolve(__dirname, "../../app/index.tsx")]
    } : {
        server: ["babel-polyfill", path.resolve(__dirname, "../../server/polyfill.js"), path.resolve(__dirname, "../../server/index.tsx")]
    };
};