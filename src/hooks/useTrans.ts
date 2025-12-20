import {useContext} from 'react';
import store from 'stores';
import {getDeviceLangCode} from 'stores/TransSlice';
import {trans} from 'trans';
import {LocalizationContext} from 'LocalizationProvider';
// import trans from "configs/trans";
// export const getTrans = (langCode: string) => {
//   const transs = langCode == 'en' ? trans.en : trans.vi
//   return transs
// }
// import { NativeModules, Platform } from 'react-native';

export const getTransAnyWere = () => {
  const langCode = store.getState()?.trans?.langCode;
  if (langCode) {
    trans.setLanguage(langCode);
  } else {
    const langCodeDevice = getDeviceLangCode();
    trans.setLanguage(langCodeDevice);
  }
  return trans;
};
const useTrans = () => {
  // const langCode = useAppSelector(state => state.trans).langCode;

  const localization = useContext(LocalizationContext);
  return localization;
};
export default useTrans;
