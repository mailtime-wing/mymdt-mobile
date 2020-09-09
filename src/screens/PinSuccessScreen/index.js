import React, {useEffect} from 'react';
import {Keyboard, ScrollView, View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import ModalContainer from '@/components/ModalContainer';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';

import {container, detailStyle} from './style';

const PinSuccessScreen = ({navigation, route}) => {
  const theme = useTheme();

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <ScrollView>
      <ModalContainer
        title={<FormattedMessage id="success" defaultMessage="success" />}>
        <View style={container}>
          <AppText variant="body1" style={detailStyle(theme)}>
            {route?.params?.pin_action}
          </AppText>
          <AppButton
            onPress={() => navigation.navigate('account_security')}
            text={
              <FormattedMessage
                id="back_to_account_security"
                defaultMessage="Back to account security"
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

export default PinSuccessScreen;
