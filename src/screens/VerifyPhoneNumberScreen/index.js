import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {useTheme} from 'emotion-theming';
import ModalContainer from '@/components/ModalContainer';
import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';

import {detailStyle, container} from './style';

const VerifyPhoneNumberScreen = ({navigation, route}) => {
  const {pin} = route.params;
  const theme = useTheme();
  return (
    <ModalContainer
      title={
        <FormattedMessage
          id="change_phone_number"
          defaultMessage="Change Phone Number"
        />
      }>
      <View style={container}>
        <AppText variant="body1" style={detailStyle(theme)}>
          <FormattedMessage id="change_phone_number_detail" />
        </AppText>
        <AppButton
          onPress={() =>
            navigation.navigate('verify_identity', {
              nextScreen: 'change_phone_number',
              otpActionKey: 'VERIFY_PHONE_NUMBER',
              pin: pin,
            })
          }
          text={<FormattedMessage id="button.next" defaultMessage="Next" />}
          variant="filled"
          sizeVariant="large"
          colorVariant="secondary"
        />
      </View>
    </ModalContainer>
  );
};

export default VerifyPhoneNumberScreen;
