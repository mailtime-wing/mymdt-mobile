import {createIntl, createIntlCache} from 'react-intl';
import {Text} from 'react-native';

import enMessages from '@/intl/en-US.json';
import hkMessages from '@/intl/zh-HK.json';
import cnMessages from '@/intl/zh-CN.json';
import enCountryNames from '@umpirsky/country-list/data/en_US/country.json';
import hkCountryNames from '@umpirsky/country-list/data/zh_HK/country.json';
import cnCountryNames from '@umpirsky/country-list/data/zh_CN/country.json';

import locales from '@/constants/locale';

window.DOMParser = require('xmldom').DOMParser;

export function flattenMessages(nestedMessages = {}, prefix = '') {
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

class Intl {
  cache = createIntlCache();
  languageList = [
    {value: locales.EN_US, label: 'English'},
    {value: locales.ZH_HK, label: '中文 （繁體）'},
    {value: locales.ZH_CN, label: '中文 （简体）'},
  ];
  translations = {
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
  intl = createIntl(
    {
      locale: locales.EN_US,
      messages: flattenMessages(this.translations.EN_US),
      defaultLocale: locales.EN_US,
      textComponent: Text,
    },
    this.cache,
  );

  get() {
    return this.intl;
  }

  changeLocale(locale) {
    this.intl = createIntl(
      {
        locale,
        messages: flattenMessages(
          this.translations[locale] || this.translations.EN_US,
        ),
        defaultLocale: locales.EN_US,
        textComponent: Text,
      },
      this.cache,
    );
    return this.get();
  }
}

/** @type Intl */
let globalIntl = null;
if (globalIntl == null) {
  globalIntl = new Intl();
}
export default globalIntl;
