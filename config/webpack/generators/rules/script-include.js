const constants = require("../constants");

module.exports = (configType) => {
    const include = [];

    include.push(constants.appDir);
    configType.isServer() && include.push(constants.serverDir);
    configType.isClient() && include.push(constants.clientDir);
    configType.isTest() && include.push(constants.testDir);

    return include;
};
