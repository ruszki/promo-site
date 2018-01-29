const typescript = require("./rules/typescript");
const json = require("./rules/json");
const pictures = require("./rules/pictures");
const fonts = require("./rules/fonts");

module.exports = (configType) => {
    const rules = [];

    rules.splice(rules.length, 0, ...typescript(configType));
    rules.splice(rules.length, 0, ...json(configType));
    rules.splice(rules.length, 0, ...pictures(configType));
    rules.splice(rules.length, 0, ...fonts(configType));

    return {
        rules
    }
};
