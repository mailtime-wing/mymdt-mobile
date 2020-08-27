import React, {useContext, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {View, Linking} from 'react-native';
import VersionNumber from 'react-native-version-number';
import {useTheme} from 'emotion-theming';
import {IntlContext} from '@/context/Intl';
import {ThemeContext} from '@/context/theme';

import {NotificationContext} from '@/context/notification';

import ModalContainer from '@/components/ModalContainer';
import ListOption from '@/components/ListOption';
import SpecialListOption from '@/components/SpecialListOption';
import Switch from '@/components/Switch';
import AppText from '@/components/AppText2';
import PopupModal from '@/components/PopupModal';
import BottomSheet from '@/components/BottomSheet';

import {appVersionStyle, container} from './style';

const SettingScreen = () => {
  const theme = useTheme();
  const {languageList, language, saveLanguage} = useContext(IntlContext);
  const {checkPermissions} = useContext(NotificationContext);
  const [push, setPush] = useState(false); // from api later
  const [showPopup, setShowPopup] = useState(false);
  const [showLanguageBottomSheet, setShowLanguageBottomSheet] = useState(false);
  const [showThemeModeBottomSheet, setShowThemeModeBottomSheet] = useState(
    false,
  );
  const {themeList, themeMode, changeThemeMode} = useContext(ThemeContext);
  const activeThemeIndex = themeList.indexOf(
    themeList.find(t => t.label === themeMode),
  );

  const handlePushToggle = async () => {
    const permissions = await checkPermissions();
    if (!permissions.alert && !push) {
      setShowPopup(true);
    } else {
      setPush(_push => !_push);
    }
  };

  const handlePopupCallback = cb => {
    if (cb === 'OK') {
      Linking.openSettings();
    }
    setShowPopup(false);
  };

  const handleLanguageOptionPress = index => {
    saveLanguage(languageList[index]);
  };

  const handleLanguageBottomSheetLayoutPress = () => {
    setShowLanguageBottomSheet(false);
  };

  const handleThemeModeOptionPress = index => {
    console.log(index);
    changeThemeMode(themeList[index].value);
  };

  const handleThemeModeBottomSheetLayoutPress = () => {
    setShowThemeModeBottomSheet(false);
  };

  return (
    <ModalContainer
      title={
        <FormattedMessage id="app_settings" defaultMessage="App settings" />
      }>
      <View style={container}>
        <ListOption
          key="language"
          label={<FormattedMessage id="language" />}
          value={language.label}
          onPress={() => setShowLanguageBottomSheet(true)}
        />
        <ListOption
          key="currency"
          label={<FormattedMessage id="currency" />}
          value="USD"
        />
        <SpecialListOption
          key="push_notification"
          label={<FormattedMessage id="push_notification" />}
          value={<Switch value={push} onChange={handlePushToggle} />}
        />
        <ListOption
          key="Theme"
          label={<FormattedMessage id="theme" />}
          value={themeMode}
          onPress={() => setShowThemeModeBottomSheet(true)}
        />
        <AppText variant="label" style={appVersionStyle(theme)}>
          <FormattedMessage
            id="app_version"
            defaultMessage="App Version: {version}"
            values={{
              version: `${VersionNumber.appVersion}-${
                VersionNumber.buildVersion
              }`,
            }}
          />
        </AppText>
        {showLanguageBottomSheet && (
          <BottomSheet
            list={languageList}
            header={
              <FormattedMessage id="language" defaultMessage="Language" />
            }
            optionActiveIndex={languageList.indexOf(language)}
            onPress={handleLanguageOptionPress}
            onLayoutPress={handleLanguageBottomSheetLayoutPress}
          />
        )}
        {showThemeModeBottomSheet && (
          <BottomSheet
            list={themeList}
            header={<FormattedMessage id="theme" defaultMessage="Theme" />}
            optionActiveIndex={activeThemeIndex}
            onPress={handleThemeModeOptionPress}
            onLayoutPress={handleThemeModeBottomSheetLayoutPress}
          />
        )}
      </View>
      {showPopup && (
        <PopupModal
          title="Notification permission required"
          detail="Please allow push permission in Settings > Notification"
          callback={handlePopupCallback}
        />
      )}
    </ModalContainer>
  );
};

export default SettingScreen;
