import React, {useEffect} from 'react';
import {useNavigationState} from '@react-navigation/native';
import {Keyboard, ScrollView, View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import ModalContainer from '@/components/ModalContainer';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';

import {container, detailStyle} from './style';

const PhoneSuccessScreen = ({navigation, route}) => {
  const theme = useTheme();
  const navigationStateRoutes = useNavigationState(state => state.routes);

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <ScrollView>
      <ModalContainer
        title={
          <FormattedMessage
            id="phone_number_changed"
            defaultMessage="Phone number changed"
          />
        }>
        <View style={container}>
          <AppText variant="body1" style={detailStyle(theme)}>
            {route?.params?.phone_action}
          </AppText>
          <AppButton
            onPress={() => {
              const settingsRoute = navigationStateRoutes.find(
                _route => _route.name === 'settingsHome',
              );
              navigation.navigate({key: settingsRoute.key});
            }}
            text={
              <FormattedMessage
                id="back_to_settings"
                defaultMessage="Back to settings"
              />
            }
            variant="filled"
            sizeVariant="large"
            colorVariant="secondary"
          />
        </View>
      </ModalContainer>
    </ScrollView>
  );
};

export default PhoneSuccessScreen;
