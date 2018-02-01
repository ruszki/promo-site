const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const path = require("path");
const fs = require("fs");
const baseConfig = require("../config/webpack/webpack.base.config");
const ConfigType = require("../config/webpack/config-type");

const manifestChunkName = "main-runtime";

const dev = !process.env.NODE_ENV || process.env.NODE_ENV != "production";

const config = baseConfig(dev ? ConfigType.ClientDev : ConfigType.ClientProd);

const compiler = webpack(config);

const server = express();

server.use(webpackDevMiddleware(compiler, {
    publicPath: "/assets/",
    serverSideRender: true,
    noInfo: true
}));

server.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: "/__webpack_hmr"
}));

server.use(express.json({
    limit: "50mb"
}));

server.get("/", (req, res) => {
    const normalizeAssets = (assets) => {
        return Array.isArray(assets) ? assets : [assets]
    }

    const addScripts = (assetsByChunkName, key, scripts) => {
        if (assetsByChunkName.hasOwnProperty(key)) {
            normalizeAssets(assetsByChunkName[key])
                .filter(path => path.endsWith(".js"))
                .forEach(path => scripts.push(`<script src="/assets/${path}" defer></script>`));
        }
    }

    const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;

    const scripts = [];
    addScripts(assetsByChunkName, manifestChunkName, scripts);

    Object.keys(assetsByChunkName).forEach(key => {
        if (key !== manifestChunkName) {
            addScripts(assetsByChunkName, key, scripts);
        }
    });

    res.send(`
<html>
  <head>
    <title>Dev mode</title>
    ${scripts.join("\n")}
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
  `)
});

server.listen(8080, () => console.log("Server started on port 8080"));
