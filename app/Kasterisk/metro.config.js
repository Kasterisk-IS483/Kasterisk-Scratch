module.exports = {
  transformer: {
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
  },
  resolver: {
    extraNodeModules: require('node-libs-react-native'),
    net: require('react-native-tcp'),
    sourceExts: ["jsx", "js", "ts", "tsx", "native", "json"],
  },
};
