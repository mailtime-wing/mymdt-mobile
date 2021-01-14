import React, {
  createContext,
  useEffect,
  useCallback,
  useState,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Linking, Platform} from 'react-native';
import {PreloadDataContext} from '@/context/preloadData';
import {SplashContext} from '@/context/splash';
import PopupModal from '@/components/PopupModal';
import ForceAppUpdateModal from '@/components/ForceAppUpdateModal';
import PseudoSplashScreen from '@/components/PseudoSplashScreen';
import {FormattedMessage} from 'react-intl';
import VersionNumber from 'react-native-version-number';
import compareVersions from 'compare-versions';
import urls from '@/constants/urls';

const isIOS = Platform.OS === 'ios';
const SKIPPED_VERSION = 'skippedVersionArr';

const initialContextValue = {
  existingAppVersion: VersionNumber.appVersion || '',
  existingBuildVersion: VersionNumber.buildVersion || '',
};
export const VersionCheckContext = createContext(initialContextValue);

export const VersionCheckProvider = ({children}) => {
  const {appConfig} = useContext(PreloadDataContext);
  const splashHidden = useContext(SplashContext);

  const minAppVersion = isIOS
    ? appConfig.minimumIOSAppVersion || ''
    : appConfig.minimumAndroidAppVersion || '';
  const latestAppVersion = isIOS
    ? appConfig.latestIOSAppVersion || ''
    : appConfig.latestAndroidAppVersion || '';

  const isMinVersionLargerThanExistingVersion =
    compareVersions(minAppVersion, initialContextValue.existingAppVersion) ===
    1;
  const isLatestVersionLargerThanExistingVersion =
    compareVersions(
      latestAppVersion,
      initialContextValue.existingAppVersion,
    ) === 1;

  const shouldShowForceUpdate = isMinVersionLargerThanExistingVersion;
  const shouldShowUpdate =
    !isMinVersionLargerThanExistingVersion &&
    isLatestVersionLargerThanExistingVersion &&
    !shouldShowForceUpdate;

  const [showUpdate, setShowUpdate] = useState(shouldShowUpdate);
  const [showForceUpdate] = useState(shouldShowForceUpdate);
  const [shouldPromptSoftUpdate, setShouldPromptSoftUpdate] = useState(null);

  useEffect(() => {
    const getSkippedVersion = async () => {
      try {
        let result = await AsyncStorage.getItem(SKIPPED_VERSION);
        if (!result) {
          result = [];
        } else {
          result = JSON.parse(result);
          if (!Array.isArray(result)) {
            result = [];
          }
        }

        if (result.includes(latestAppVersion)) {
          setShouldPromptSoftUpdate(false);
          return;
        }

        setShouldPromptSoftUpdate(true);
        result.push(latestAppVersion);
        await AsyncStorage.setItem(SKIPPED_VERSION, JSON.stringify(result));

        return;
      } catch (e) {
        console.error(`${e} in getting theme mode`);
      }
    };
    getSkippedVersion();
  }, [latestAppVersion]);

  const openAppStoreUrl = async () => {
    const url = isIOS ? urls.APP_STORE : urls.GOOGLE_PLAY;
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
  };

  // if force update is required, rendering children (the rest of the app) can cause bugs,
  // so we render a pseudo-splash screen instead. In other case, rendering children should
  // be fine.
  //
  // Besides, `splashHidden` is considered because the splash screen does not work well with
  // Modal. Only one can exist at the same time, so we need to ensure splash is hidden
  // before opening the modal
  return (
    <VersionCheckContext.Provider value={initialContextValue}>
      {showForceUpdate ? <PseudoSplashScreen /> : children}
      {!!showForceUpdate && splashHidden && (
        <ForceAppUpdateModal
          latestAppVersion={latestAppVersion}
          onUpdatePress={handleForceUpdatePress}
        />
      )}
      {!!showUpdate && shouldPromptSoftUpdate && splashHidden && (
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
