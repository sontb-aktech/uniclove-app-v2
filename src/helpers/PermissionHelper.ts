import {Alert, Platform} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
  check,
} from 'react-native-permissions';
import store from 'stores';
import UserSlice from 'stores/UserSlice';

const requestPermissionContact = async () => {
  try {
    const permission = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CONTACTS
        : PERMISSIONS.ANDROID.READ_CONTACTS,
    );
    switch (permission) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        showAlertPermissionContact();
        break;
    }
    return permission;
  } catch (e) {
    console.log(e);
  }
};

const requestPermissionLocation = async () => {
  const permission = await request(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  );
  switch (permission) {
    case RESULTS.GRANTED:
      return true;
      break;
    default:
      return false;
  }
};

const requestPermissionCamera = async () => {
  try {
    const permission = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    switch (permission) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        return true;
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        showAlertPermissionCamera();
        break;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

const checkResult = () => {};

const showAlertPermissionContact = () => {
  Alert.alert(
    'Không có quyền truy cập danh bạ',
    'Vui lòng đi đến cài đặt và cấp quyền truy cập danh bạ?',
    [
      {
        text: 'Yes',
        onPress: openSettings,
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ],
  );
};

const showAlertPermissionCamera = () => {
  Alert.alert(
    'Không có quyền truy cập camera',
    'Anh vui lòng đi đến cài đặt và cấp quyền truy cập camera?',
    [
      {
        text: 'Yes',
        onPress: openSettings,
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ],
  );
};

const requestPermissionRecordAudio = async () => {
  if (Platform.OS == 'ios') {
    const permission = await request(PERMISSIONS.IOS.SPEECH_RECOGNITION);
    if (permission == 'granted') {
      return true;
    }
  }
  try {
    const permission = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (permission == 'granted') {
      return true;
    }
  } catch {}
  return false;
};

export default {
  requestPermissionContact,
  requestPermissionCamera,
  requestPermissionLocation,
  requestPermissionRecordAudio,
};
