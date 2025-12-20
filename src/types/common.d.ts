type NoticeType = 'warning' | 'success';

type ScreenRouteProp<T extends keyof import('screens').RootStackParamList> =
  import('@react-navigation/core').RouteProp<
    import('screens').RootStackParamList,
    T
  >;

// type FirebaseFirestoreTypes =
//   import('@react-native-firebase/firestore').FirebaseFirestoreTypes;

type HostType = {
  test: string;
  std: string;
  prod: string;
};

type NotificationDataType = {
  id?: string;
  type?: string;
  referenceId?: string;
  createBy?: string;
  updateBy?: string;
  eData?: string;
  title?: string;
  body?: string;
  image?: string;
  updateAt?: number;
  createAt?: number;
  isRead?: boolean;
  disable?: boolean;
};

type NotificationParams = {
  to: string;
  data: NotificationDataType;
  priority: 'hight';
};

type LangType = {
  code?: string;
  name?: string;
  tag?: string;
  flag?: any;
  tintColor?: any;
  momentLocale?: any;
  country?: string;
  name_en?: string;
  isAds?: boolean;
};

// type AssistantsType = {
//   id: number;
//   title: string;
//   desc?: string;
//   image?: string;
//   color?: string;
// };

type ThemeType = 'light' | 'dark' | null | undefined;

type ImageType = {
  uri: string;
  type?: string;
  name?: string;
};

type ConfigType = {
  android_version_code: number;
  tracking_login: string;
  show_admob_banner: number;
  ios_version_name: string;
  appReview: boolean;
  emails_admin: string[];
  admobChecking: boolean;
  ads_inter_expired_sec: number;
  ads_inter_interval_sec: number;
  ads_native_expired_sec: number;
  ads_show_app_open: boolean;
};
