import {Platform} from 'react-native';
// import {Settings, AppEventsLogger} from 'react-native-fbsdk-next';

const initializeSDK = () => {
  // Settings.setAppID('351155423984933');
  if (Platform.OS == 'android') {
    // Settings.initializeSDK();
  }
  // Settings.setAdvertiserTrackingEnabled(true);
};

export default {initializeSDK};
