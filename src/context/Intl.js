import React, {createContext, useCallback} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {IntlProvider} from 'react-intl';
import {useApolloClient, useQuery} from '@apollo/client';
import {gql} from 'apollo-boost';

import {GET_USER_LOCALE} from '@/api/data';
import locales from '@/constants/locale';
import {LOCALE_STORAGE_KEY} from '@/constants/storageKey';

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
  const client = useApolloClient();
  const {data} = useQuery(GET_USER_LOCALE, {fetchPolicy: 'cache-only'});

  const id = data?.userProfile?.id || 'default-user';
  const locale = data?.userProfile?.locale || locales.EN_US;

  const language =
    languageList.find((_language) => _language.value === locale) ||
    languageList[0];
  const translation = translations[locale];

  const saveLocale = useCallback(
    async (newLocale) => {
      try {
        await AsyncStorage.setItem(
          LOCALE_STORAGE_KEY,
          JSON.stringify(newLocale),
        );
        client.writeQuery({
          id: `User:${id}`,
          rootId: '',
          query: gql`
            query {
              locale
            }
          `,
          data: {
            locale: newLocale,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [client, id],
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
