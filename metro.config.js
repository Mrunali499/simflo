const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const path = require("path");

const backendRoot = path.resolve(__dirname, "../simflo-backend");
const syncfloRoot = path.resolve(__dirname, "../syncflo");
const config = getDefaultConfig(__dirname);

config.watchFolders = [backendRoot, syncfloRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(backendRoot, "node_modules"),
  path.resolve(syncfloRoot, "node_modules"),
];

// Block nested react/redux instances to prevent duplicates
config.resolver.blockList = [
  /.*(syncflo|simflo-backend)[/\\]node_modules[/\\](react|react-dom|react-redux|@reduxjs[/\\]toolkit)[/\\].*/
];

config.resolver.unstable_enablePackageExports = true;

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react': path.resolve(__dirname, 'node_modules/react'),
  'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
  'react-redux': path.resolve(__dirname, 'node_modules/react-redux'),
  '@reduxjs/toolkit': path.resolve(__dirname, 'node_modules/@reduxjs/toolkit'),
};

// Configure SVG transformer
config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...config.resolver.sourceExts, "svg"],
};

module.exports = withNativeWind(config, { input: "./global.css" });
