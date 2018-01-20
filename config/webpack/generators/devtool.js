module.exports = (configType) => {
    return configType.isDev() || configType.isTest() ? "inline-source-map" : undefined;
};
