// import codePush from 'react-native-code-push';
// import VersionInfo from 'react-native-version-info';
// import DeviceInfo from 'react-native-device-info';
import Clipboard from '@react-native-clipboard/clipboard';
import Configs from 'configs';
import {Dimensions, Linking, Platform, Text, TextInput} from 'react-native';
// import NetInfo from "@react-native-community/netinfo";
const windowWidth = Dimensions.get('window').width;
const widthDesign = 1600;
interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: {allowFontScaling?: boolean};
}

const timeout = (time: number) => {
  let timeout: any;
  let run = (timeIn?: number) =>
    new Promise(resolve => {
      timeout = setTimeout(() => {
        resolve(true);
      }, timeIn ?? time);
    });

  return {
    run,
    cancel: () => {
      if (timeout) clearInterval(timeout);
    },
  };
};

const getVersion = async () => {
  const DeviceInfo = require('react-native-device-info').default;
  // const getUpdateMetadata = require('react-native-code-push').getUpdateMetadata;
  // const metadata = await getUpdateMetadata();
  // if (metadata) {
  // return {codepush: metadata.label, version: metadata.appVersion};
  // } else {
  return {codepush: 'v0', version: DeviceInfo.getVersion()};
  // }
  // return {codepush: 'v0', version: VersionInfo.appVersion};
};

const getDeviceUniqueId = async () => {
  const DeviceInfo = require('react-native-device-info').default;
  let uniqueId = '';
  try {
    uniqueId = (await DeviceInfo.getUniqueId()) as string;
  } catch {}
  return uniqueId;
};

const linkingPhoneCall = async (phoneNumber: string) => {
  Linking.openURL(`tel:${phoneNumber}`);
};

const linkingFacebook = (facebookId: string) => {
  Linking.canOpenURL(`fb://profile/${facebookId}`).then(
    supported => {
      if (supported) {
        Linking.openURL(`fb://profile/${facebookId}`);
      } else {
        Linking.openURL(`https://www.facebook.com/${facebookId}`);
      }
    },
    err => console.log(err),
  );
};

const linkingZalo = (zaloId: string) => {
  Linking.openURL(`https://zalo.me/${zaloId}`);
};

const linkingWebsite = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch {}
};

const openMapAndroid = (lat: string, long: string, label: string) => {
  Linking.openURL(`geo:0,0?q=${lat},${long}(${label})`);
};

const openGoolgeMapIos = async (lat: string, long: string, label: string) => {
  const scheme = `comgooglemaps://?q=${label}&center=${lat},${long}&zoom=14`;
  let canOpen = false;
  try {
    canOpen = await Linking.canOpenURL(scheme);
  } catch {}
  if (canOpen) {
    Linking.openURL(scheme);
  } else {
    Linking.openURL(
      `https://www.google.com/maps/place/${label}/@${lat},${long},14z`,
    );
  }
};

const openAppleMapIos = async (lat: string, long: string, label: string) => {
  const url = `maps:0,0?q=${label}@${lat},${long}`;
  Linking.openURL(url);
};

const disableFontScale = () => {
  (Text as unknown as TextWithDefaultProps).defaultProps =
    (Text as unknown as TextWithDefaultProps).defaultProps || {};
  (Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
    false;
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps =
    (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
  (
    TextInput as unknown as TextInputWithDefaultProps
  ).defaultProps!.allowFontScaling = false;
};

const emailTo = (email: string) => {
  Linking.openURL(`mailto:${email}`);
};

const copyText = (text: string) => {
  Clipboard.setString(text);
};

export default {
  timeout,
  getVersion,
  getDeviceUniqueId,
  linkingPhoneCall,
  linkingFacebook,
  linkingZalo,
  openMapAndroid,
  openGoolgeMapIos,
  openAppleMapIos,
  getParamsFromUrl: (url: string) => {
    try {
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params: {[key: string]: any} = {},
        match;
      while ((match = regex.exec(url))) {
        params[match[1]] = match[2];
      }
      return params;
    } catch {}
  },
  linkingWebsite,
  getFullAddressFromPlace: (
    ward?: string,
    district?: string,
    province?: string,
  ) => {
    return `${ward ? ward + ', ' : ''}${district ? district + ', ' : ''}${
      province ? province : ''
    }`;
  },
  disableFontScale,
  convertSize: (size: number) => {
    const proportionWidth = windowWidth / widthDesign;
    return proportionWidth * size;
  },
  estimateGPTTokens: (text: string) => {
    // Loại bỏ khoảng trắng thừa
    text = text.trim();

    // Ước lượng token: chia văn bản thành các phần dựa trên khoảng trắng và dấu câu
    const tokens = text.split(/[\s,.!?;:()'"`]+/);

    // Trả về số lượng token ước lượng
    return tokens.length;
  },
  getRandomElement: <T>(arr: T[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  openGooglePlayStore: async () => {
    try {
      if (Platform.OS == 'android') {
        const url = `https://play.google.com/store/apps/details?id=${Configs.ANDROID_APP_ID}`;
        await Linking.openURL(url);
      } else {
        await Linking.openURL(
          'itms-apps://itunes.apple.com/us/app/apple-store/id6587583261?mt=8',
        );
      }
    } catch {}
    // const urlMarket = `market://details?id=${Configs.ANDROID_APP_ID}`;

    // Linking.canOpenURL(url)
    //   .then(supported => {
    //     if (!supported) {
    //       console.log("Can't handle url: " + url);
    //       return Linking.openURL(url);
    //     }
    //   })
    //   .catch(err => console.error('An error occurred', err));
  },
  emailTo,
  randomIntFromInterval: (min: number, max: number) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  copyText,
};
