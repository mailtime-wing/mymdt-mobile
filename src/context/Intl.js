import React, {useState, createContext, useEffect} from 'react';
import {AsyncStorage, Text} from 'react-native';
import {IntlProvider} from 'react-intl';

import locales from '@/constants/locale';
import {LANGUAGE_STORAGE_KEY} from '@/constants/storageKey';

import enMessages from '@/intl/en-US.json';
import hkMessages from '@/intl/zh-HK.json';
import cnMessages from '@/intl/zh-CN.json';

window.DOMParser = require('xmldom').DOMParser;
const IntlContext = createContext(null);

const languageList = [
  {value: locales.EN_US, label: 'English'},
  {value: locales.ZH_HK, label: '中文 （繁體）'},
  {value: locales.ZH_CN, label: '中文 （简体）'},
];

const translations = {
  [locales.EN_US]: enMessages,
  [locales.ZH_HK]: hkMessages,
  [locales.ZH_CN]: cnMessages,
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
        localeEnum: Object.keys(locales).find(key => locales[key] === language),
        saveLanguage: saveLanguage,
        loadLanguage: loadLanguage,
      }}>
      <IntlProvider
        locale={language}
        messages={translation}
        defaultLocale={locales.EN_US}
        textComponent={Text}>
        {props.children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};

export {IntlContainer, IntlContext};
