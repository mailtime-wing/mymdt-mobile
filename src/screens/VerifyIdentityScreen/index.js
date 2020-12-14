import React from 'react';
import {FormattedMessage} from 'react-intl';

import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_PHONE_NUMBER} from '@/api/data';

import splitPhoneNumber from '@/utils/splitPhoneNumber';

import VerifyVerificationCodeForm from '@/components/VerifyVerificationCodeForm';

const VerifyIdentityScreen = ({navigation, route}) => {
  const {nextScreen, otpActionKey, pin} = route.params;

  const {data} = useQueryWithAuth(GET_USER_PHONE_NUMBER);
  const phoneNubmer = data?.userProfile?.phoneNumber;

  const handleSubmitPress = (values) => {
    navigation.navigate(nextScreen, {
      otp: values.verificationCode,
      pin: pin,
    });
  };

  return (
    <VerifyVerificationCodeForm
      title={<FormattedMessage id="verify_identity" />}
      description={
        <FormattedMessage
          id="we_have_sent_otp"
          values={{
            phone_number: splitPhoneNumber(phoneNubmer),
          }}
        />
      }
      submitButtonText={
        <FormattedMessage id="button.submit" defaultMessage="Submit" />
      }
      phoneNubmer={phoneNubmer}
      otpActionKey={otpActionKey}
      onSubmit={handleSubmitPress}
      requestOtpOnMount={true}
    />
  );
};

export default VerifyIdentityScreen;
