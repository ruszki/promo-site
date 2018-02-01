const constants = require("./constants");

function getClientDevName(client, dev) {
    return (client ? constants.clientName : constants.serverName) +
        "_" +
        (dev ? constants.devName : constants.prodName);
}

module.exports = (configType) => {
    return configType.isTest() ? constants.testName : getClientDevName(configType.isClient(), configType.isDev());
};
