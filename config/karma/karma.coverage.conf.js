const baseConfig = require("./karma.base.conf");

module.exports = function(config) {
    config.set(baseConfig(true));
};
