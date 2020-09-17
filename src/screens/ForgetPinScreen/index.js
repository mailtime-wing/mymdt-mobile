import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {useTheme} from 'emotion-theming';
import ModalContainer from '@/components/ModalContainer';
import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';

import {detailStyle, container} from './style';

const ForgetPinScreen = ({navigation}) => {
  const theme = useTheme();
  return (
    <ModalContainer
      title={<FormattedMessage id="forget_pin" defaultMessage="Forget Pin" />}>
      <View style={container}>
        <AppText variant="body1" style={detailStyle(theme)}>
          <FormattedMessage id="forget_pin_detail" />
        </AppText>
        <AppButton
          onPress={() =>
            navigation.navigate('verify_identity', {
              nextScreen: 'reset_pin',
              otpActionKey: 'RESET_PIN',
            })
          }
          text={<FormattedMessage id="next" defaultMessage="Next" />}
          variant="filled"
          sizeVariant="large"
          colorVariant="secondary"
        />
      </View>
    </ModalContainer>
  );
};

export default ForgetPinScreen;
