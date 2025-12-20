import {getApp} from '@react-native-firebase/app';

import {
  FirebaseAppCheckTypes,
  initializeAppCheck,
} from '@react-native-firebase/app-check';
import {ReactNativeFirebaseAppCheckProvider} from '@react-native-firebase/app-check';
import {getId, getInstallations} from '@react-native-firebase/installations';
import Configs from 'configs';

const rnfbProvider = new ReactNativeFirebaseAppCheckProvider();
rnfbProvider.configure({
  android: {
    provider: __DEV__ || Configs.ENV == 'DEV' ? 'debug' : 'playIntegrity',
    // provider: 'debug',
    debugToken: '36003220-2FD6-4630-9AEA-13B48AA95C58',
  },
  apple: {
    provider: __DEV__ ? 'debug' : 'appAttestWithDeviceCheckFallback',
    debugToken: 'C10302FC-4CDA-444D-9A46-48AA9708AA3F',
  },
});

let appCheckInstance: FirebaseAppCheckTypes.Module;
const installations = getInstallations();

const initAppCheck = async () => {
  try {
    appCheckInstance = await initializeAppCheck(getApp(), {
      provider: rnfbProvider,
      isTokenAutoRefreshEnabled: true,
    });
    console.log('---- initAppCheck success');
  } catch (err) {
    console.log('---- initAppCheck error', err);
  }
};

const getAppCheckToken = async () => {
  try {
    // `appCheckInstance` is the saved return value from initializeAppCheck
    const {token} = (await appCheckInstance?.getToken()) ?? {};
    console.log('--- getAppCheckToken', token);
    return token;
  } catch (error) {
    console.log('AppCheck verification failed', error);
  }
};

const getInstallationId = async () => {
  try {
    const installationId = await getId(installations);
    return installationId;
  } catch (error) {}
};

export default {
  initAppCheck,
  getAppCheckToken,
  getInstallationId,
};
