module.exports = (client, dev) => {
    return client ? "web" : "node";
};