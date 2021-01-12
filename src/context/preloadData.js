import React, {
  createContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react';
import {Linking, Platform} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_APP_CONFIG_API} from '@/api/data';
import PopupModal from '@/components/PopupModal';
import ForceAppUpdateModal from '@/components/ForceAppUpdateModal';
import {FormattedMessage} from 'react-intl';
import VersionNumber from 'react-native-version-number';
import compareVersions from 'compare-versions';
import urls from '@/constants/urls';

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
  const [showUpdate, setShowUpdate] = useState(false);
  const [showForceUpdate, setShowForceUpdate] = useState(false);

  const appConfig = appConfigApiData?.appConfig;
  const minAppVersion = appConfig?.minimumAppVersion || '';
  const latestAppVersion = appConfig?.latestAppVersion || '';
  const existingAppVersion = VersionNumber.appVersion || '';

  const isMinVersionLargerThanExistingVersion =
    compareVersions(minAppVersion, existingAppVersion) === 1;
  const isLatestVersionLargerThanExistingVersion =
    compareVersions(latestAppVersion, existingAppVersion) === 1;

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

  useEffect(() => {
    if (isMinVersionLargerThanExistingVersion) {
      setShowForceUpdate(true);
    }

    if (
      isLatestVersionLargerThanExistingVersion &&
      !isMinVersionLargerThanExistingVersion
    ) {
      setShowUpdate(true);
    }

    return () => {
      setShowUpdate(false);
      setShowForceUpdate(false);
    };
  }, [
    isMinVersionLargerThanExistingVersion,
    isLatestVersionLargerThanExistingVersion,
  ]);

  const openAppStoreUrl = async () => {
    const url = Platform.OS === 'ios' ? urls.APP_STORE : urls.GOOGLE_PLAY;
    const supported = Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handlePopupPress = useCallback(async (pressed) => {
    if (pressed === 'OK') {
      openAppStoreUrl();
    }
    setShowUpdate(false);
  }, []);

  const handleForceUpdatePress = () => {
    openAppStoreUrl();
    setShowForceUpdate(false);
  };

  return (
    <PreloadDataContext.Provider value={preloadDataContext}>
      {children}
      {!!showForceUpdate && (
        <ForceAppUpdateModal
          latestAppVersion={latestAppVersion}
          onUpdatePress={handleForceUpdatePress}
        />
      )}
      {!!showUpdate && (
        <PopupModal
          title={
            <FormattedMessage
              id="new_version_available"
              defaultMessage="A new version is avaliable"
            />
          }
          detail={
            <FormattedMessage
              id="you_need_to_update_before_use"
              defaultMessage="A new version {latest_app_version} is avaliable. You will need to update to use this app."
              values={{latest_app_version: latestAppVersion}}
            />
          }
          okButtonLabel={
            <FormattedMessage id="button.update" defaultMessage="Update" />
          }
          cancelButtonLabel={
            <FormattedMessage
              id="button.next_time"
              defaultMessage="Next Time"
            />
          }
          callback={handlePopupPress}
        />
      )}
    </PreloadDataContext.Provider>
  );
};

export default PreloadDataProvider;
