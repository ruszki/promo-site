module.exports = (configType) => {
    return configType.isClient() || configType.isTest() ? {} : {
        "express": "commonjs express"
    };
};
