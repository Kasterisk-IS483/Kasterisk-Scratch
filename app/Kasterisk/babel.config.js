module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'module:metro-react-native-babel-preset',
      // '@babel/preset-flow',
    ],
    plugins: [
      'react-native-reanimated/plugin',
    ],
    // plugins: [
    //   ['transform-class-properties'],
    // ],
  };
};