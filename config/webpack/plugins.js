const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const LoadableWebpack = require("react-loadable/webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkManifestHtmlWebpackPlugin = require("inline-chunk-manifest-html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");
const utils = require("./utils");
const path = require("path");

module.exports = (client, dev) => {
    const plugins = [];

    plugins.push(new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        tslint: path.resolve(__dirname, "../tslint.json"),
        tsconfig: path.resolve(__dirname, "../tsconfig.json")
    }));

    plugins.push(new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(dev ? "development" : "production")
        }
    }));

    plugins.push(dev ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin());

    dev && plugins.push(new webpack.HotModuleReplacementPlugin());

    !dev && plugins.push(new UglifyJsPlugin({
        uglifyOptions: {
            ecma: 6
        }
    }));

    client && plugins.push(new webpack.optimize.CommonsChunkPlugin({
        names: "vendor",
        minChunks: function(module) {
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }));

    client && plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
    }));

    client && plugins.push(new LoadableWebpack.ReactLoadablePlugin({
        filename: path.resolve(__dirname, "../../build/" + utils.getName(false) + "/react-loadable.json"),
    }));

    client && plugins.push(new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../../server/resources/index.html"),
        filename: path.resolve(__dirname, "../../build/" + utils.getName(false) + "/index.html"),
        inject: false
    }));

    client && plugins.push(new InlineChunkManifestHtmlWebpackPlugin({
        dropAsset: true
    }));

    client && plugins.push(new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, "../../app/favicon.png"),
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

    !client && plugins.push(new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
    }));

    return plugins;
};
