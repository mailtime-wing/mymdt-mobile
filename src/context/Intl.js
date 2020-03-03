import React, {useState, createContext, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {IntlProvider} from 'react-intl';

import locale from '@/constants/locale';
import {LANGUAGE_STORAGE_KEY} from '@/constants/storageKey';

import enMessages from '@/intl/en-US.json';
import hkMessages from '@/intl/zh-HK.json';
import cnMessages from '@/intl/zh-CN.json';

const IntlContext = createContext(null);

const languageList = [
  {value: locale.en, label: 'English'},
  {value: locale.hk, label: '中文 （繁體）'},
  {value: locale.cn, label: '中文 （简体）'},
];

const translations = {
  [locale.en]: enMessages,
  [locale.hk]: hkMessages,
  [locale.cn]: cnMessages,
};

const IntlContainer = props => {
  const [language, setLanguage] = useState(languageList[0].value); // default is english
  const [translation, setTranslation] = useState(translations[language]);

  const saveLanguage = async value => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, value);
      setLanguage(value);
      setTranslation(translations[value]);
    } catch (error) {
      console.error(error);
    }
  };

  const loadLanguage = async () => {
    try {
      const data = await AsyncStorage.getItem('language');
      if (data !== null) {
        setLanguage(data);
        setTranslation(translations[data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLanguage();
  }, []);

  return (
    <IntlContext.Provider
      value={{
        languageList: languageList,
        saveLanguage: saveLanguage,
        loadLanguage: loadLanguage,
      }}>
      <IntlProvider
        locale={language}
        messages={translation}
        defaultLocale="en-US">
        {props.children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};

export {IntlContainer, IntlContext};
