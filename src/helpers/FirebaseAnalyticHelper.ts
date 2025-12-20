import analytics from '@react-native-firebase/analytics';

export default {
  logScreenView: async (screenName: string) => {
    try {
      await analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenName,
      });
    } catch {}
  },
  logEvent: async (eventName: string, data?: {[key: string]: any}) => {
    try {
      const eventNameOk = `${eventName}${__DEV__ ? '_dev' : ''}`.substring(
        0,
        40,
      );
      console.log(`--- logEvent ${eventNameOk}`, data);

      await analytics().logEvent(eventNameOk, data);
      analytics().setUserProperties({});
    } catch (err) {
      console.log('--- logEvent error', err);
    }
  },
};
