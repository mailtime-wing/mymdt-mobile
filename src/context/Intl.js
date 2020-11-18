import React, {createContext, useCallback} from 'react';
import {Text} from 'react-native';
import {IntlProvider} from 'react-intl';
import {useQuery} from '@apollo/client';

import {GET_USER_LOCALE, UPDATE_USER_LOCALE} from '@/api/data';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import locales from '@/constants/locale';

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

function flattenMessages(nestedMessages = {}, prefix = '') {
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

const IntlContainer = (props) => {
  const {data} = useQuery(GET_USER_LOCALE, {fetchPolicy: 'cache-only'});
  const [updateUserLocale] = useMutationWithAuth(UPDATE_USER_LOCALE);

  const locale = data?.userProfile?.locale || locales.EN_US;

  const language =
    languageList.find((_language) => _language.value === locale) ||
    languageList[0];
  const translation = translations[locale];

  const saveLocale = useCallback(
    async (newLocale) => {
      try {
        const localeForAPI = Object.keys(locales).find(
          (key) => locales[key] === newLocale,
        );
        await updateUserLocale({
          variables: {
            locale: localeForAPI,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [updateUserLocale],
  );

  return (
    <IntlContext.Provider
      value={{
        language,
        languageList,
        localeEnum: Object.keys(locales).find((key) => locales[key] === locale),
        saveLocale,
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
