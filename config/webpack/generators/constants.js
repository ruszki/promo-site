const path = require("path");

const rootDir = path.resolve(__dirname, "../../../");
const buildDir = path.resolve(rootDir, "build/");

module.exports = {
    clientName: "client",
    serverName: "server",
    devName: "dev",
    prodName: "prod",
    testName: "test",
    rootDir,
    configDir: path.resolve(rootDir, "config/"),
    appDir: path.resolve(rootDir, "app/"),
    clientDir: path.resolve(rootDir, "client/"),
    serverDir: path.resolve(rootDir, "server/"),
    testDir: path.resolve(rootDir, "test/"),
    buildDir,
    clientBuildDir: path.resolve(buildDir, "client/"),
    serverBuildDir: path.resolve(buildDir, "server/"),
    testBuildDir: path.resolve(buildDir, "test/"),
    cacheDir: path.resolve(rootDir, ".cache/"),
    publicPath: "/assets/"
};
