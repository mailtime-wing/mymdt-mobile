import React, {
  createContext,
  useEffect,
  useCallback,
  useState,
  useContext,
} from 'react';
import {Linking, Platform} from 'react-native';
import {PreloadDataContext} from '@/context/preloadData';
import PopupModal from '@/components/PopupModal';
import ForceAppUpdateModal from '@/components/ForceAppUpdateModal';
import {FormattedMessage} from 'react-intl';
import VersionNumber from 'react-native-version-number';
import compareVersions from 'compare-versions';
import urls from '@/constants/urls';

const existingAppVersion = VersionNumber.appVersion || '';
const existingBuildVersion = VersionNumber.buildVersion || '';

export const VersionCheckContext = createContext();

export const VersionCheckProvider = ({children}) => {
  const {appConfig} = useContext(PreloadDataContext);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showForceUpdate, setShowForceUpdate] = useState(false);

  const minAppVersion = appConfig?.minimumAppVersion || '';
  const latestAppVersion = appConfig?.latestAppVersion || '';

  const isMinVersionLargerThanExistingVersion =
    compareVersions(minAppVersion, existingAppVersion) === 1;
  const isLatestVersionLargerThanExistingVersion =
    compareVersions(latestAppVersion, existingAppVersion) === 1;

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
    <VersionCheckContext.Provider
      value={{
        currentAppVersion: existingAppVersion,
        currentBuildVersion: existingBuildVersion,
      }}>
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
    </VersionCheckContext.Provider>
  );
};

export default VersionCheckProvider;
