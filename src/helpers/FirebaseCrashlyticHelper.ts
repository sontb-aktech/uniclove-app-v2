import crashlytics from '@react-native-firebase/crashlytics';

const logScreen = async (screenName: string) => {
  console.log('---- crashlytic log screen:', screenName);
  try {
    await crashlytics().setAttribute('current_screen', screenName);
  } catch {}
};

export default {
  logScreen,
};
