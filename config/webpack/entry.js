const path = require("path");

module.exports = (client, dev) => {
    return {
        main: client ? ["babel-polyfill", path.resolve(__dirname, "../../app/index.tsx")] : undefined,
        server: client ? undefined : ["babel-polyfill", path.resolve(__dirname, "../../server/polyfill.js"), path.resolve(__dirname, "../../server/index.tsx")]
    };
};