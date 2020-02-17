import React, { useState, createContext } from 'react';
import { AsyncStorage } from 'react-native'; 

import en from './../locale/en.json'
import hk from './../locale/hk.json'
import cn from './../locale/cn.json'

export const LanguageContext = createContext(null);

const LanguageProvider = (props) => {
  const LANGUAGE_STORAGE_KEY = 'language'
  const [languageList] = useState([
    { value: 'en', label: 'English'},
    { value: 'hk', label: '中文 （繁體）'},
    { value: 'cn', label: '中文 （简体）'},
  ])
  const translations = { en, hk, cn }
  const [language, setLanguage] = useState(languageList[0].value)
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
      if(data !== null){
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