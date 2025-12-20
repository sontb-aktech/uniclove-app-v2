module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        root: ['./src'],
        alias: {
          apis: './src/apis',
          components: './src/components',
          helpers: './src/helpers',
          hooks: './src/hooks',
          screens: './src/screens',
          stores: './src/stores',
          assets: './src/assets',
          node_customs: './node_customs',
          utils: './src/utils',
          configs: './src/configs',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
