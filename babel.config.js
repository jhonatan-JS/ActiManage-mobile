module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@pages': './src/pages',
          '@styles': './src/styles',
          '@interface': './src/interface',
          '@services': './src/services',
        },
      },
    ],
  ],
};
