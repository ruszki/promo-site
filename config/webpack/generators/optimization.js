module.exports = (configType) => {
    if (!configType.isServer() && !configType.isTest()) {
        return {
            splitChunks: {
                chunks: "all"
            },
            runtimeChunk: true
        }
    } else {
        return {};
    }
};
