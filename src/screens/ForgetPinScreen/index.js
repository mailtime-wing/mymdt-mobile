import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {useTheme} from 'emotion-theming';
import HeaderTitle from '@/components/HeaderTitle';
import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';

import {detailStyle, container} from './style';

const ForgetPinScreen = ({navigation}) => {
  const theme = useTheme();
  return (
    <View>
      <HeaderTitle>
        <FormattedMessage id="forget_pin" defaultMessage="Forget Pin" />
      </HeaderTitle>
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
          text={<FormattedMessage id="button.next" defaultMessage="Next" />}
          variant="filled"
          sizeVariant="large"
          colorVariant="secondary"
        />
      </View>
    </View>
  );
};

export default ForgetPinScreen;
