import React, {createContext, useCallback, useMemo} from 'react';
import {RawIntlProvider} from 'react-intl';
import {useQuery} from '@apollo/client';

import {GET_USER_LOCALE, UPDATE_USER_LOCALE} from '@/api/data';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import locales from '@/constants/locale';
import globalIntl from '@/intl';

const IntlContext = createContext(null);

const IntlContainer = (props) => {
  const {data} = useQuery(GET_USER_LOCALE, {fetchPolicy: 'cache-only'});
  const [updateUserLocale] = useMutationWithAuth(UPDATE_USER_LOCALE);

  const locale = data?.userProfile?.locale || locales.EN_US;

  const language =
    globalIntl.languageList.find((_language) => _language.value === locale) ||
    globalIntl.languageList[0];

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

  const intl = useMemo(() => {
    return globalIntl.changeLocale(locale);
  }, [locale]);

  return (
    <IntlContext.Provider
      value={{
        language,
        languageList: globalIntl.languageList,
        localeEnum: Object.keys(locales).find((key) => locales[key] === locale),
        saveLocale,
      }}>
      <RawIntlProvider value={intl}>{props.children}</RawIntlProvider>
    </IntlContext.Provider>
  );
};

export {IntlContainer, IntlContext};
