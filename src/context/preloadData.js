import React, {createContext, useEffect, useMemo} from 'react';
import {useQuery} from '@apollo/client';
import {GET_APP_CONFIG_API} from '@/api/data';

const preloadDataContextInitialValue = {
  initialized: false,
  appConfig: {},
};
export const PreloadDataContext = createContext(preloadDataContextInitialValue);

export const PreloadDataProvider = ({children}) => {
  const {
    data: appConfigApiData,
    startPolling: appConfigStartPolling,
    stopPolling: appConfigStopPolling,
  } = useQuery(GET_APP_CONFIG_API);

  const appConfig = appConfigApiData?.appConfig;

  useEffect(() => {
    if (!appConfig) {
      appConfigStartPolling(1000);
    }

    return () => {
      appConfigStopPolling();
    };
  }, [appConfigStopPolling, appConfig, appConfigStartPolling]);

  const preloadDataContext = useMemo(
    () => ({
      initialized: !!appConfig,
      appConfig,
    }),
    [appConfig],
  );

  return (
    <PreloadDataContext.Provider value={preloadDataContext}>
      {children}
    </PreloadDataContext.Provider>
  );
};

export default PreloadDataProvider;
