import notifee, {
  AndroidGroupAlertBehavior,
  AndroidImportance,
  AndroidVisibility,
  EventDetail,
  EventType,
} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {StoreType} from 'stores';
import Constants from 'utils/Constants';

const setupNotification = async () => {
  try {
    if (Platform.OS == 'android') {
      notifee.createChannel({
        id: Constants.NOTI_CHANNEL_ID,
        name: Constants.NOTI_CHANNEL_NAME,
        importance: AndroidImportance.HIGH,
        sound: 'default',
        visibility: AndroidVisibility.PUBLIC,
      });
    } else {
      notifee.onForegroundEvent(({type, detail}) => {
        console.log('--- onForegroundEvent', detail);

        const store = require('stores').default as StoreType;
      });
    }

    subscribeToTopic('');

    // await notifee.setBadgeCount(0);
  } catch (err) {
    console.log('---- err setBadgeCount ', err);
  }
};

const requestNotificationPermission = async () => {
  try {
    await messaging().requestPermission();
    await notifee.requestPermission();
  } catch {}
};

const subscribeToTopic = async (topic: string) => {
  try {
    await messaging().subscribeToTopic(topic);
  } catch {}
};

const unsubscribeFromTopic = async (topic: string) => {
  try {
    await messaging().unsubscribeFromTopic(topic);
  } catch {}
};

const dispayNotification = async (
  title?: string,
  body?: string,
  largeIcon?: string,
  data?: NotificationDataType,
) => {
  try {
    await notifee.displayNotification({
      title: title,
      body: body,
      data: data as any,
      android: {
        channelId: Constants.NOTI_CHANNEL_ID,
        importance: AndroidImportance.HIGH,
        circularLargeIcon: true,
        sound: 'default',
        smallIcon: 'ic_notification',
        // color: '#ffffff',
        lightUpScreen: true,
        groupId: data?.referenceId,
        groupAlertBehavior: AndroidGroupAlertBehavior.CHILDREN,
        pressAction: {
          id: 'default',
        },
        ...(largeIcon ? {largeIcon} : {}),
      },
      ios: {
        sound: 'default',
        ...(largeIcon ? {attachments: [{url: largeIcon}]} : {}),
      },
    });
    incrementBadgeCountByReferenceId(data);
  } catch {}
};

const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    console.log(' getFcmToken', fcmToken);
    console.log('');
    return fcmToken;
  } catch (err) {
    console.log(' ---- err getFcmToken', err);
  }
  return '';
};

const onTokenRefresh = async (listener: (token: string) => void) => {
  try {
    const fcmToken = await messaging().getToken();
    listener(fcmToken);
    messaging().onTokenRefresh(listener);
  } catch {}
};

const onClickNotification = async (type: number, detail: EventDetail) => {
  try {
    const data = detail.notification?.data as NotificationDataType;
    if (type == EventType.ACTION_PRESS || type == EventType.PRESS) {
      console.log('----- onClickNotification', detail);
      handleNavigate(data);
      decrementBadgeCountByReferenceId(data.referenceId);
    }
    if (
      type === EventType.ACTION_PRESS &&
      detail.pressAction?.id === 'mark-as-read'
    ) {
      decrementBadgeCountByReferenceId(data.referenceId);
    }
  } catch {}
};

const notificationListener = () => {
  return messaging().onMessage(remoteMessage => {
    console.log('--- onMessage', remoteMessage);
    const data = remoteMessage.data as NotificationDataType;
    if (checkCanShowNotificaion(data)) {
      // const title = getTitle(data);
      // const body = getBody(data);
      // const image = getImage(data);
      dispayNotification(data.title, data.body, data.image, data);
      handleData(data);
    }
  });
};

const notificationBackground = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    handleNotificationBackground(remoteMessage);
  });
  notifee.onBackgroundEvent(async ({type, detail}) => {
    onClickNotification(type, detail);
  });
};

const handleNotificationBackground = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  console.log('--- setBackgroundMessageHandler', remoteMessage);
  const data = remoteMessage.data as NotificationDataType;
  if (checkCanShowNotificaion(data, true)) {
    if (Platform.OS == 'android') {
      // const title = getTitle(data);
      // const body = getBody(data);
      // const image = getImage(data);
      dispayNotification(data.title, data.body, data.image, data);
    } else {
      try {
        incrementBadgeCountByReferenceId(data);
      } catch (err) {
        console.log('---- err incrementBadgeCount', err);
      }
    }

    handleData(data);
  }
};

const handleNavigateFromNotification = async () => {
  messaging().onNotificationOpenedApp(message => {
    console.log('--- onNotificationOpenedApp', message);
    if (message.data) {
      const data = message.data as NotificationDataType;
      handleNavigate(data);
    }
  });

  // trên ios click vào noti ở background và forceground đều nhảy vào đây
  notifee.onForegroundEvent(({type, detail}) => {
    console.log('--- onForegroundEvent', detail);

    onClickNotification(type, detail);
  });
  if (Platform.OS == 'android') {
    const initNoti = await notifee.getInitialNotification();
    const initMessage = await messaging().getInitialNotification();

    const data =
      initNoti?.notification.data ??
      (initMessage?.data as NotificationDataType | undefined);
    if (data) {
      handleNavigate(data);
    }
  } else {
    const store = require('stores').default as StoreType;
  }
};

const handleNavigate = (data: NotificationDataType) => {};

const cancelAllNotifications = async () => {
  notifee.cancelAllNotifications();
};

const decrementBadgeCountByReferenceId = (referenceId?: string) => {};

const incrementBadgeCountByReferenceId = (data?: NotificationDataType) => {};

const checkCanShowNotificaion = (
  data: NotificationDataType,
  isBackground?: boolean,
) => {
  return true;
};

// const getTitle = (data: NotificationDataType) => {
//   let title = data.title;
//   if (data.type == Constants.NOTI_CHAT_TYPE) {
//     const arr = title?.split(',');
//     if (arr?.length && arr?.length > 1) {
//       const name = data.createBy == 'gpt' ? 'Chat GPT' : arr[0];
//       const threadName = arr[1];
//       title = `${name} send new message to '${threadName}'`;
//     }
//   }
//   return title;
// };

// const getBody = (data: NotificationDataType) => {
//   let body = data.body;
//   const trans = getTransAnyWere();
//   if (data.type == Constants.NOTI_FRIEND_TYPE) {
//     if (data.eData) {
//       const eData = JSON.parse(data.eData) as UserInfoType;
//       if (eData?.status == 3) {
//         if (data.createBy != data.updateBy) {
//           body = trans.you_accept_friend_request;
//         } else {
//           body = trans.has_accept_your_friend_request;
//         }
//       } else if (eData?.status == 2) {
//         body = trans.send_you_friend_request;
//       } else if (data.createBy != data.updateBy) {
//         body = trans.you_cancel_friend_request;
//       }
//     }
//   }
//   return body;
// };

// const getImage = (data: NotificationDataType) => {
//   let image = data.image;
//   if (data.type == Constants.NOTI_CHAT_TYPE) {
//     if (data.createBy == Constants.CREATE_BY_GPT) {
//       image = GPT_AVATAR;
//     }
//   }
//   return image;
// };

const handleData = (data: NotificationDataType) => {};

const setBadgeCount = (count: number) => {
  notifee.setBadgeCount(count);
};

export default {
  setupNotification,
  subscribeToTopic,
  unsubscribeFromTopic,
  dispayNotification,
  getFcmToken,
  notificationListener,
  notificationBackground,
  handleNavigateFromNotification,
  cancelAllNotifications,
  onTokenRefresh,
  requestNotificationPermission,
  setBadgeCount,
  handleNotificationBackground,
  onClickNotification,
};
