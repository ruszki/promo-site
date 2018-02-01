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

    configType.isClient() && configType.isProd() && plugins.push(new LoadableWebpack.ReactLoadablePlugin({
        filename: path.resolve(constants.serverBuildDir, "react-loadable.json"),
    }));

    return plugins;
};
