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
import PopupModal from '@/components/PopupModal';
import ForceAppUpdateModal from '@/components/ForceAppUpdateModal';
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
  const [finishLoading, setFinishLoading] = useState(false);

  const minAppVersion = isIOS
    ? appConfig?.minimumIOSAppVersion || ''
    : appConfig?.minimumAndroidAppVersion || '';
  const latestAppVersion = isIOS
    ? appConfig?.latestIOSAppVersion || ''
    : appConfig?.latestAndroidAppVersion || '';

  const isMinVersionLargerThanExistingVersion =
    compareVersions(minAppVersion, initialContextValue?.existingAppVersion) ===
    1;
  const isLatestVersionLargerThanExistingVersion =
    compareVersions(
      latestAppVersion,
      initialContextValue?.existingAppVersion,
    ) === 1;

  const shouldShowForceUpdate = isMinVersionLargerThanExistingVersion;
  const shouldShowUpdate =
    !isMinVersionLargerThanExistingVersion &&
    isLatestVersionLargerThanExistingVersion &&
    !shouldShowForceUpdate;

  const [showUpdate, setShowUpdate] = useState(shouldShowUpdate);
  const [showForceUpdate, setShowForceUpdate] = useState(shouldShowForceUpdate);
  const [shouldPromptSoftUpdate, setShouldPromptSoftUpdate] = useState(null);
  const [skippedVersionArr, setSkippedVersionArr] = useState([]);

  useEffect(() => {
    const getSkippedVersion = async () => {
      try {
        const result = await AsyncStorage.getItem(SKIPPED_VERSION);
        if (result && Array.isArray(result)) {
          setSkippedVersionArr(JSON.parse(result));
        }
      } catch (e) {
        console.error(`${e} in getting theme mode`);
      }
    };
    getSkippedVersion();
  }, [shouldShowForceUpdate, shouldShowUpdate, latestAppVersion]);

  useEffect(() => {
    setShowUpdate(shouldShowUpdate);
    setShowForceUpdate(shouldShowForceUpdate);

    if (!Array.isArray(skippedVersionArr)) {
      return;
    }
    const shouldPrompt = !skippedVersionArr.includes(latestAppVersion);
    setShouldPromptSoftUpdate(shouldPrompt);
    setFinishLoading(true);
  }, [
    shouldShowUpdate,
    shouldShowForceUpdate,
    skippedVersionArr,
    latestAppVersion,
  ]);

  const openAppStoreUrl = async () => {
    const url = isIOS ? urls.APP_STORE : urls.GOOGLE_PLAY;
    const supported = Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handleSkipVersionPress = useCallback(async () => {
    if (!Array.isArray(skippedVersionArr)) {
      return;
    }

    try {
      if (!skippedVersionArr.includes(latestAppVersion)) {
        await AsyncStorage.setItem(
          SKIPPED_VERSION,
          JSON.stringify(skippedVersionArr.push(latestAppVersion)),
        );
      }
    } catch (e) {
      console.error(`${e} in skip update version`);
    }
  }, [skippedVersionArr, latestAppVersion]);

  const handlePopupPress = useCallback(
    async (pressed) => {
      if (pressed === 'OK') {
        openAppStoreUrl();
      }
      setShowUpdate(false);
      handleSkipVersionPress();
    },
    [handleSkipVersionPress],
  );

  const handleForceUpdatePress = () => {
    openAppStoreUrl();
    setShowForceUpdate(false);
  };

  return (
    <VersionCheckContext.Provider value={initialContextValue}>
      {finishLoading && children}
      {!!showForceUpdate && (
        <ForceAppUpdateModal
          latestAppVersion={latestAppVersion}
          onUpdatePress={handleForceUpdatePress}
        />
      )}
      {!!showUpdate && shouldPromptSoftUpdate && (
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
