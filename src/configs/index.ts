import Config from 'react-native-config';

type ConfigENV = {
  ENV: 'DEV' | 'STD' | 'PROD';
  APP_NAME: string;
  IOS_APP_ID: string;
  IOS_VERSION_NAME: string;
  IOS_VERSION_CODE: string;
  ANDROID_APP_ID: string;
  ANDROID_VERSION_NAME: string;
  ANDROID_VERSION_CODE: string;
  APP_SHARED_SECRET: string;

  DEFAULT_API_URL: string;
  CHAT_SOCKET_URL: string;
  CHAT_API_URL: string;
  NEWCHAT_API_URL: string;
  PRESENCE_API_URL: string;
  UUA_API_URL: string;
  NOTIFICATION_API_URL: string;
  RELATIONSHIP_API_URL: string;
};
const Configs = {
  //@ts-ignore
  ...Config.getConstants(),
} as ConfigENV;
console.log('--- Configs', Configs);
export default Configs;
