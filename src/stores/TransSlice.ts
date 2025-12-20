import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import Api from 'apis/Api';
// import Api from 'apis/Api';
import {I18nManager, NativeModules, Platform, Settings} from 'react-native';
import {findBestLanguageTag} from 'react-native-localize';
import {LIST_LANGUAGE} from 'utils/Common';
const listLangs: LangType[] = require('json/language.json');

export const getDeviceLangCode = () => {
  // const langCode: string =
  //   Platform.OS === 'ios'
  //     ? NativeModules.SettingsManager.settings.AppleLocale ||
  //       NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
  //     : NativeModules.I18nManager.localeIdentifier;
  const langBest = findBestLanguageTag(
    LIST_LANGUAGE.map(item => item.code!),
  )?.languageTag;
  // const lang = langBest
  //   ? LIST_LANGUAGE.find(item => item.code.startsWith(langBest))
  //   : undefined;

  return langBest ?? 'en';
};

export const getDeviceVoiceCode = () => {
  let langCode = 'en';

  if (Platform.OS === 'ios') {
    const settings = Settings.get('AppleLocale');
    const locale = settings || settings?.[0];
    if (locale) langCode = locale;
  } else {
    const locale = I18nManager.getConstants().localeIdentifier;
    if (locale) langCode = locale;
  }
  const lang = listLangs.find(item => item.code == langCode);
  if (lang) {
    return lang;
  }
  return {
    name: 'English',
    code: 'en_US',
  };
};

const initialState = {
  langCode: undefined as string | undefined,
  langTag: undefined as string | undefined,
  // langCodeByThread: {} as {[key: string]: string},
  // selectedHistories: {} as {[key: string]: LangType[]},
  // isHeyAIByThread: {} as {[key: string]: boolean},
};

const TransSlice = createSlice({
  name: 'trans',
  initialState,
  reducers: {
    setLangCode: (
      state,
      action: PayloadAction<{langCode?: string; langTag?: string} | undefined>,
    ) => {
      state.langCode = action.payload?.langCode ?? undefined;
      state.langTag = action.payload?.langTag;
    },
  },
  extraReducers: builder => {},
});

export default TransSlice;
