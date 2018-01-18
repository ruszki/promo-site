module.exports = (client, dev) => {
    return dev ? "inline-source-map" : undefined;
};