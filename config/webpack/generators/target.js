module.exports = (configType) => {
    return configType.isClient() || configType.isTest() ? "web" : "node";
};
