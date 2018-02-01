module.exports = (configType, use, options) => {
    if (!configType.isTest()) {
        use.push({
            loader: "thread-loader",
            options
        });
    }
};
