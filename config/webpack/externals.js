module.exports = (client, dev) => {
    return client ? {} : {
        "express": "commonjs express"
    };
};