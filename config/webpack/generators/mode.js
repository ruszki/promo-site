module.exports = (configType) => {
    return configType.isDev() || configType.isTest() ? "development" : "production";
};
