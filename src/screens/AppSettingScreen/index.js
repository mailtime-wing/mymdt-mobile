import React, {useContext, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {View} from 'react-native';
import VersionNumber from 'react-native-version-number';
import {useTheme} from 'emotion-theming';
import {IntlContext} from '@/context/Intl';

import {AuthContext} from '@/context/auth';

import ModalContainer from '@/components/ModalContainer';
import ListOption from '@/components/ListOption';
import SpecialListOption from '@/components/SpecialListOption';
import Switch from '@/components/Switch';
import AppText from '@/components/AppText2';

import {appVersionStyle, container} from './style';

const SettingScreen = ({navigation}) => {
  const theme = useTheme();
  const {language} = useContext(IntlContext);
  const {notificationEnabled} = useContext(AuthContext);
  const [push, setPush] = useState(false); // from api later
  const handlePushToggle = () => {
    console.log(notificationEnabled);
    setPush(!push);
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
          value={language}
          onPress={() => navigation.navigate('language')}
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
      </View>
    </ModalContainer>
  );
};

export default SettingScreen;
