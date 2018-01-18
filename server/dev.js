const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require("path");
const fs = require("fs");
const utils = require("../config/webpack/utils");
const output = require("../config/webpack/output");
const resolve = require("../config/webpack/resolve");
const plugins = require("../config/webpack/plugins");
const devtool = require("../config/webpack/devtool");
const entry = require("../config/webpack/entry");
const modulePack = require("../config/webpack/module");
const target = require("../config/webpack/target");
const externals = require("../config/webpack/externals");

const buildPath = path.resolve(__dirname, "../../build");

if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
}

const config = (client, dev) => {
    return {
        name: utils.getName(client, dev),
        output: output(client, dev),
        resolve: resolve(client, dev),
        plugins: plugins(client, dev),
        devtool: devtool(client, dev),
        entry: entry(client, dev),
        module: modulePack(client, dev),
        target: target(client, dev),
        externals: externals(client, dev)
    };
};

const dev = !process.env.NODE_ENV || process.env.NODE_ENV != "production";

const configArray = [
    config(true, dev),
    config(false, dev)
];

const compiler = webpack(configArray);

const server = express();

server.use(webpackDevMiddleware(compiler, {
    publicPath: "/assets/",
    serverSideRender: true
}));

server.use(express.json({
    limit: "50mb"
}));

server.get("/", (req, res) => {
    const normalizeAssets = (assets) => {
        return Array.isArray(assets) ? assets : [assets]
    }

    const assetsByChunkName = res.locals.webpackStats.toJson().children[0].assetsByChunkName;

    const scripts = [];

    if (assetsByChunkName.hasOwnProperty("manifest")) {
        normalizeAssets(assetsByChunkName["manifest"])
            .filter(path => path.endsWith('.js'))
            .forEach(path => scripts.push(`<script src="/assets/${assetsByChunkName["manifest"]}" defer></script>`));
    }

    if (assetsByChunkName.hasOwnProperty("vendor")) {
        normalizeAssets(assetsByChunkName["vendor"])
            .filter(path => path.endsWith('.js'))
            .forEach(path => scripts.push(`<script src="/assets/${assetsByChunkName["vendor"]}" defer></script>`));
    }

    if (assetsByChunkName.hasOwnProperty("main")) {
        normalizeAssets(assetsByChunkName["main"])
            .filter(path => path.endsWith('.js'))
            .forEach(path => scripts.push(`<script src="/assets/${assetsByChunkName["main"]}" defer></script>`));
    }

    Object.keys(assetsByChunkName).forEach(key => {
        if (assetsByChunkName.hasOwnProperty(key) && key !== "manifest" && key !== "vendor" && key !== "main") {
            normalizeAssets(assetsByChunkName[key])
                .filter(path => path.endsWith('.js'))
                .forEach(path => scripts.push(`<script src="/assets/${assetsByChunkName[key]}" defer></script>`));
        }
    });

    res.send(`
<html>
  <head>
    <title>Dev mode</title>
    ${scripts.join('\n')}
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
  `)
});

server.listen(8080, () => console.log("Server started on port 8080"));