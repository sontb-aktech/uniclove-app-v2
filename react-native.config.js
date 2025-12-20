module.exports = {
  dependencies: {
    'react-native-admob-native-ads': {
      platforms: {
        ios: null,
      },
    },
    '@invertase/react-native-apple-authentication': {
      platforms: {
        android: null,
      },
    },
  },
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
  },
  iosAssets: ['./assets'],
};
