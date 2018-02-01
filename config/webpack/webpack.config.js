const path = require("path");
const fs = require("fs");
const baseConfig = require("./webpack.base.config");
const ConfigType = require("./config-type");

const buildPath = path.resolve(__dirname, "../../build");

if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
}

const getConfigType = (client, dev) => {
    if (client) {
        if (dev) {
            return baseConfig(ConfigType.ClientDev);
        } else {
            return baseConfig(ConfigType.ClientProd);
        }
    } else {
        if (dev) {
            return baseConfig(ConfigType.ServerDev);
        } else {
            return baseConfig(ConfigType.ServerProd);
        }
    }
};

module.exports = [
    (env, argv) => getConfigType(true, !env || !env.prod),
    (env, argv) => getConfigType(false, !env || !env.prod)
];
