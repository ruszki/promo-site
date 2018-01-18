const typescript = require("./rules/typescript");
const json = require("./rules/json");
const pictures = require("./rules/pictures");
const fonts = require("./rules/fonts");

module.exports = (client, dev) => {
    const rules = [];

    rules.push(typescript(client, dev));
    rules.push(json(client, dev));
    rules.push(pictures(client, dev));
    rules.push(fonts(client, dev));

    return {
        rules
    }
};