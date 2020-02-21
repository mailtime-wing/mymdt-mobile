import React, { useState, createContext } from 'react';
import { AsyncStorage } from 'react-native';

import locale from './../constants/locale'
import { LANGUAGE_STORAGE_KEY } from './../constants/storageKey'

import enMessages from './../intl/en-US.json'
import hkMessages from './../intl/zh-HK.json'
import cnMessages from './../intl/zh-CN.json'

export const LanguageContext = createContext(null);

const LanguageProvider = (props) => {
  const languageList = [
    { value: locale.en, label: 'English' },
    { value: locale.hk, label: '中文 （繁體）' },
    { value: locale.cn, label: '中文 （简体）' },
  ]

  const translations = {
    [locale.en]: enMessages,
    [locale.hk]: hkMessages,
    [locale.cn]: cnMessages,
  }

  const [language, setLanguage] = useState(languageList[0].value) // default is english
  const [translation, setTranslation] = useState(translations[language])

  const saveLanguage = async (value) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, value);
      setLanguage(value)
      setTranslation(translations[value])
    } catch (error) {
      console.error(error)
    }
  }

  const loadLanguage = async () => {
    try {
      const data = await AsyncStorage.getItem('language');
      if (data !== null) {
        setLanguage(data)
        setTranslation(translations[data])
      }
    } catch (error) {
      console.error(error)
    }
  };
  loadLanguage();

  return (
    <LanguageContext.Provider
      value={{
        languageList: languageList,
        language: language,
        saveLanguage: saveLanguage,
        loadLanguage: loadLanguage,
        translation: translation
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider