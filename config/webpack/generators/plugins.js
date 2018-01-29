const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const LoadableWebpack = require("react-loadable/webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkManifestHtmlWebpackPlugin = require("inline-chunk-manifest-html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const constants = require("./constants");

module.exports = (configType) => {
    const plugins = [];

    const configFilePath = "typescript/" + (
        configType.isClient() ? "tsconfig.client.json" :
            configType.isServer() ? "tsconfig.server.json" :
                configType.isTest() ? "tsconfig.test.json" : undefined
    );

    plugins.push(new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        tslint: path.resolve(constants.configDir, "tslint.json"),
        tsconfig: path.resolve(constants.configDir, configFilePath)
    }));

    plugins.push(new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(configType.isDev() || configType.isTest() ? "development" : "production")
        }
    }));

    (configType.isDev() || configType.isProd) && plugins.push(configType.isDev() ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin());

    (configType.isDev() || configType.isTest()) && plugins.push(new webpack.SourceMapDevToolPlugin({
        test: /((chunk)|(((main)|(vendor)|(server))\.entry))\.js$/,
        moduleFilenameTemplate: "/[resource-path]"
    }));

    configType.isDev() && plugins.push(new webpack.HotModuleReplacementPlugin());

    configType.isProd() && plugins.push(new UglifyJsPlugin({
        uglifyOptions: {
            ecma: 6
        }
    }));

    configType.isClient() && plugins.push(new webpack.optimize.CommonsChunkPlugin({
        names: "vendor",
        minChunks: function(module) {
            return module.context && module.context.indexOf("node_modules") !== -1;
        }
    }));

    configType.isClient() && plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
    }));

    configType.isClient() && configType.isProd() && plugins.push(new LoadableWebpack.ReactLoadablePlugin({
        filename: path.resolve(constants.serverBuildDir, "react-loadable.json"),
    }));

    configType.isClient() && plugins.push(new HtmlWebpackPlugin({
        template: path.resolve(constants.serverDir, "resources/index.html"),
        filename: path.resolve(constants.serverBuildDir, "index.html"),
        inject: false
    }));

    configType.isClient() && plugins.push(new InlineChunkManifestHtmlWebpackPlugin({
        dropAsset: true
    }));

    configType.isClient() && plugins.push(new FaviconsWebpackPlugin({
        logo: path.resolve(constants.appDir, "favicon.png"),
        prefix: "img/favicons-[hash]/",
        inject: true,
        icons: {
            android: false,
            appleIcon: false,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            opengraph: false,
            twitter: false,
            yandex: false,
            windows: false
        },
        emitStats: false
    }));

    (configType.isServer() || configType.isTest()) && plugins.push(new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
    }));

    return plugins;
};
