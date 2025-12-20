import React, {createContext, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'stores';
import TransSlice, {getDeviceLangCode} from 'stores/TransSlice';
import {trans} from './trans/trans';
const DEFAULT_LANGUAGE = 'en';
export const LocalizationContext = createContext({
  trans,
  langCode: 'en',
  langTag: 'en-US',
});

import moment from 'moment';
import {LIST_LANGUAGE} from 'utils/Common';
// import SharedPrefModule from 'modules/SharedPrefModule';

export const LocalizationProvider = (props: {children: any}) => {
  const {langCode, langTag} = useAppSelector(state => state.trans);
  // const langTag = useAppSelector(state => state.trans).langTag;

  const [refreshLangCode, setRefreshLangCode] = useState(langCode);
  const dispatch = useAppDispatch();
  useEffect(() => {
    initLangCode();
  }, [langCode]);

  const initLangCode = async () => {
    console.log(
      '----- trans.getAvailableLanguages()',
      trans.getAvailableLanguages(),
    );
    if (langCode) {
      trans.setLanguage(langCode);
      setRefreshLangCode(langCode);
      const language = LIST_LANGUAGE.find(item => item.tag == langTag);
      moment.updateLocale(langCode, language?.momentLocale);
      // SharedPrefModule.setSelectedLanguageCode(langCode);
    } else {
      try {
        const langCodeDevice = getDeviceLangCode();
        trans.setLanguage(langCodeDevice);
        setRefreshLangCode(langCodeDevice);
        const language = LIST_LANGUAGE.find(
          item => item.code == langCodeDevice,
        );
        moment.updateLocale(langCodeDevice, language?.momentLocale);
      } catch (err) {}
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        trans,
        langCode: refreshLangCode ?? 'en',
        langTag: langTag ?? 'en-US',
      }}>
      {props.children}
    </LocalizationContext.Provider>
  );
};
