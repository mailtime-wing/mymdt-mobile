import React, {useState, createContext, useEffect} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {IntlProvider} from 'react-intl';

import locales from '@/constants/locale';
import {LANGUAGE_STORAGE_KEY} from '@/constants/storageKey';

import enMessages from '@/intl/en-US.json';
import hkMessages from '@/intl/zh-HK.json';
import cnMessages from '@/intl/zh-CN.json';
import enCountryNames from '@umpirsky/country-list/data/en_US/country.json';
import hkCountryNames from '@umpirsky/country-list/data/zh_HK/country.json';
import cnCountryNames from '@umpirsky/country-list/data/zh_CN/country.json';

window.DOMParser = require('xmldom').DOMParser;
const IntlContext = createContext(null);

const languageList = [
  {value: locales.EN_US, label: 'English'},
  {value: locales.ZH_HK, label: '中文 （繁體）'},
  {value: locales.ZH_CN, label: '中文 （简体）'},
];

const translations = {
  [locales.EN_US]: {
    ...enCountryNames,
    ...enMessages,
  },
  [locales.ZH_HK]: {
    ...hkCountryNames,
    ...hkMessages,
  },
  [locales.ZH_CN]: {
    ...cnCountryNames,
    ...cnMessages,
  },
};

function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

const IntlContainer = props => {
  const [language, setLanguage] = useState(languageList[0]); // default is english
  const locale = language.value;
  const [translation, setTranslation] = useState(translations[locale]);

  const saveLanguage = async newLanguage => {
    try {
      await AsyncStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        JSON.stringify(newLanguage),
      );
      setLanguage(newLanguage);
      setTranslation(translations[newLanguage.value]);
    } catch (error) {
      console.error(error);
    }
  };

  const loadLanguage = async () => {
    try {
      const data = JSON.parse(await AsyncStorage.getItem('language'));
      if (data !== null) {
        setLanguage(data);
        setTranslation(translations[data.value]);
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
        language: languageList.find(lang => lang.value === locale),
        languageList: languageList,
        localeEnum: Object.keys(locales).find(key => locales[key] === locale),
        saveLanguage: saveLanguage,
        loadLanguage: loadLanguage,
      }}>
      <IntlProvider
        locale={locale}
        messages={flattenMessages(translation)}
        defaultLocale={locales.EN_US}
        textComponent={Text}>
        {props.children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};

export {IntlContainer, IntlContext};
