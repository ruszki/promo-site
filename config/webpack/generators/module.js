const typescript = require("./rules/typescript");
const json = require("./rules/json");
const pictures = require("./rules/pictures");
const fonts = require("./rules/fonts");

module.exports = (configType) => {
    const rules = [];

    rules.push(typescript(configType));
    rules.push(json(configType));
    rules.push(pictures(configType));
    rules.push(fonts(configType));

    return {
        rules
    }
};
