import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {useQuery} from '@apollo/client';
import {GET_USER_SETUP_STATUS_API, GET_APP_CONFIG_API} from '@/api/data';

import SplashScreen from '@/screens/SplashScreen';
import {AuthContext} from '@/context/auth';

const preloadDataContextInitialValue = {
  setupStatus: {
    isDataSourceBound: false,
    isProfileCompleted: false,
    isCashbackCurrencyCodeSet: false,
    isBasicOfferSet: false,
  },
  appConfig: {},
};
export const PreloadDataContext = createContext(preloadDataContextInitialValue);

export const PreloadDataProvider = ({children}) => {
  const {authToken} = useContext(AuthContext);
  const authTokenRef = useRef(authToken);

  const skip = !authToken;
  const context = {
    headers: {
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  };

  const {
    data: userSetupStatusApiData,
    refetch: setupStatusRefetch,
    startPolling: setupStatusStartPolling,
    stopPolling: setupStatusStopPolling,
  } = useQuery(GET_USER_SETUP_STATUS_API, {
    skip,
    context,
  });

  const {
    data: appConfigApiData,
    startPolling: appConfigStartPolling,
    stopPolling: appConfigStopPolling,
  } = useQuery(GET_APP_CONFIG_API);

  useEffect(() => {
    // TODO: maybe extract this refetch logic into a hook
    if (authTokenRef.current !== authToken) {
      authTokenRef.current = authToken;

      if (authToken) {
        setupStatusRefetch();
      }
    }
  }, [authToken, setupStatusRefetch]);

  const setupStatus = authToken
    ? userSetupStatusApiData?.userProfile?.setupStatus
    : preloadDataContextInitialValue.setupStatus;
  const appConfig = appConfigApiData?.appConfig;

  const preloadDataContext = useMemo(
    () => ({
      setupStatus,
      appConfig,
    }),
    [appConfig, setupStatus],
  );

  useEffect(() => {
    if (!setupStatus) {
      setupStatusStartPolling(1000);
    }

    return () => {
      setupStatusStopPolling();
    };
  }, [setupStatusStopPolling, setupStatus, setupStatusStartPolling]);

  useEffect(() => {
    if (!appConfig) {
      appConfigStartPolling(1000);
    }

    return () => {
      appConfigStopPolling();
    };
  }, [appConfigStopPolling, appConfig, appConfigStartPolling]);

  // ensure all data required by our app is loaded
  if (!setupStatus || !appConfig) {
    return <SplashScreen />;
  }

  return (
    <PreloadDataContext.Provider value={preloadDataContext}>
      {children}
    </PreloadDataContext.Provider>
  );
};

export default PreloadDataProvider;
