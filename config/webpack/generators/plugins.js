const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const LoadableWebpack = require("react-loadable/webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkManifestHtmlWebpackPlugin = require("inline-chunk-manifest-html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const constants = require("./constants");

const forkTsCheckerWebpackPlugin = (configType, plugins) => {
    const configFilePath = "typescript/" + (
        configType.isClient() ? "tsconfig.client.json" :
            configType.isServer() ? "tsconfig.server.json" :
                "tsconfig.test.json"
    );

    plugins.push(new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        tslint: path.resolve(constants.configDir, "tslint.json"),
        tsconfig: path.resolve(constants.configDir, configFilePath)
    }));
};

const definePlugin = (configType, plugins) => {
    plugins.push(new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(configType.isDev() || configType.isTest() ? "development" : "production")
        }
    }));
};

const moduleNamePlugin = (configType, plugins) => {
    if (configType.isDev() || configType.isProd()) {
        plugins.push(configType.isDev() ?
            new webpack.NamedModulesPlugin() :
            new webpack.HashedModuleIdsPlugin());
    }
};

const sourceMapDevToolPlugin = (configType, plugins) => {
    if (configType.isDev() || configType.isTest()) {
        plugins.push(new webpack.SourceMapDevToolPlugin({
            test: /((chunk)|(((main)|(vendor)|(server))\.entry))\.js$/,
            moduleFilenameTemplate: "/[resource-path]"
        }));
    }
};

const hotModuleReplacementPlugin = (configType, plugins) => {
    if (configType.isDev()) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
};

const uglifyJsPlugin = (configType, plugins) => {
    if (configType.isProd()) {
        plugins.push(new UglifyJsPlugin({
            uglifyOptions: {
                ecma: 6
            }
        }));
    }
};

const vendorCommonsChunkPlugin = (configType, plugins) => {
    if (configType.isClient()) {
        plugins.push(new webpack.optimize.CommonsChunkPlugin({
            names: "vendor",
            minChunks: (module) => {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }));
    }
};

const manifestCommonsChunkPlugin = (configType, plugins) => {
    if (configType.isClient()) {
        plugins.push(new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }));
    }
};

const reactLoadablePlugin = (configType, plugins) => {
    if (configType.isClient() && configType.isProd()) {
        plugins.push(new LoadableWebpack.ReactLoadablePlugin({
            filename: path.resolve(constants.serverBuildDir, "react-loadable.json"),
        }));
    }
};

const htmlWebpackPlugin = (configType, plugins) => {
    if (configType.isClient()) {
        plugins.push(new HtmlWebpackPlugin({
            template: path.resolve(constants.serverDir, "resources/index.html"),
            filename: path.resolve(constants.serverBuildDir, "index.html"),
            inject: false
        }));
    }
};

const inlineChunkManifestHtmlWebpackPlugin = (configType, plugins) => {
    if (configType.isClient()) {
        plugins.push(new InlineChunkManifestHtmlWebpackPlugin({
            dropAsset: true
        }));
    }
};

const faviconsWebpackPlugin = (configType, plugins) => {
    if (configType.isClient()) {
        plugins.push(new FaviconsWebpackPlugin({
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
    }
};

const limitChunkCountPlugin = (configType, plugins) => {
    if (configType.isServer() || configType.isTest()) {
        plugins.push(new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }));
    }
};

module.exports = (configType) => {
    const plugins = [];

    forkTsCheckerWebpackPlugin(configType, plugins);
    definePlugin(configType, plugins);
    moduleNamePlugin(configType, plugins);
    sourceMapDevToolPlugin(configType, plugins);
    hotModuleReplacementPlugin(configType, plugins);
    uglifyJsPlugin(configType, plugins);
    vendorCommonsChunkPlugin(configType, plugins);
    manifestCommonsChunkPlugin(configType, plugins);
    reactLoadablePlugin(configType, plugins);
    htmlWebpackPlugin(configType, plugins);
    inlineChunkManifestHtmlWebpackPlugin(configType, plugins);
    faviconsWebpackPlugin(configType, plugins);
    limitChunkCountPlugin(configType, plugins);

    return plugins;
};
