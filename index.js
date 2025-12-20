/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
// import { registerWidgetTaskHandler } from 'react-native-android-widget';
// import widgetTaskHandler from 'widgetTaskHandler';
import NotificationHelper from 'helpers/NotificationHelper';
import 'utils/StringUtils';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
// import TrackPlayer from 'react-native-track-player';
// import {PlaybackService} from 'helpers/TextToSpeechHelper';
// import {polyfill as polyfillEncoding} from 'react-native-polyfill-globals/src/encoding';
// import {polyfill as polyfillReadableStream} from 'react-native-polyfill-globals/src/readable-stream';
// import {polyfill as polyfillFetch} from 'react-native-polyfill-globals/src/fetch';
// polyfillReadableStream();
// polyfillEncoding();
// polyfillFetch();

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   NotificationHelper.handleNotificationBackground(remoteMessage);
// });

// notifee.onBackgroundEvent(async ({ type, detail }) => {
//   NotificationHelper.onClickNotification(type, detail);
// });

AppRegistry.registerComponent(appName, () => App);
// registerWidgetTaskHandler(widgetTaskHandler);
// TrackPlayer.registerPlaybackService(() => PlaybackService);
