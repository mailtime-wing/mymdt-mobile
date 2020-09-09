import React, {useContext, useEffect, useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {Formik, useFormikContext} from 'formik';
import {useTheme} from 'emotion-theming';
import ModalContainer from '@/components/ModalContainer';
import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import Input from '@/components/AppInput';

import {IntlContext} from '@/context/Intl';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithReset from '@/hooks/useMutationWithReset';
import useCountDownTimer from '@/hooks/timer';
import {GET_OTP_API} from '@/api/auth';
import {GET_USER_PHONE_NUMBER} from '@/api/data';

import splitPhoneNumber from '@/utils/splitPhoneNumber';

import {detailStyle, container, formContainer, button} from './style';

const SendOtpForm = ({}) => {
  const {handleSubmit, isValid} = useFormikContext();

  return (
    <View style={formContainer}>
      <Input
        keyboardType="number-pad"
        label={
          <FormattedMessage
            id="verification_code"
            defaultMessage="VERIFICATION CODE"
          />
        }
        name="verificationCode"
      />
      <AppButton
        onPress={handleSubmit}
        text={<FormattedMessage id="submit" defaultMessage="Submit" />}
        disabled={!isValid}
        variant="filled"
        sizeVariant="large"
        colorVariant="secondary"
        style={button}
      />
    </View>
  );
};

const validate = values => {
  const errors = {};

  if (!values.verificationCode) {
    errors.verificationCode = (
      <FormattedMessage id="required" defaultMessage="Required" />
    );
  }

  if (!!values.verificationCode && values.verificationCode.length !== 6) {
    errors.verificationCode = (
      <FormattedMessage
        id="invalid_otp"
        defaultMessage="OTP is a 6 digit number"
      />
    );
  }

  return errors;
};

const VerifyIdentityScreen = ({navigation}) => {
  const theme = useTheme();
  const {localeEnum} = useContext(IntlContext);
  const [otpRequest] = useMutationWithReset(GET_OTP_API);

  const {data} = useQueryWithAuth(GET_USER_PHONE_NUMBER);
  const [timeLeft, setCountdownTime] = useCountDownTimer(0);
  const isTimerStarted = timeLeft > 0;

  const phoneNubmer = data?.userProfile?.phoneNumber;

  const handleSendPress = useCallback(() => {
    setCountdownTime(60);
    otpRequest({
      variables: {
        phoneNumber: phoneNubmer,
        locale: localeEnum,
        action: 'RESET_PIN',
      },
    });
  }, [localeEnum, otpRequest, phoneNubmer, setCountdownTime]);

  useEffect(() => {
    if (phoneNubmer) {
      handleSendPress();
    }
  }, [handleSendPress, phoneNubmer]);

  const handleSubmitPress = values => {
    navigation.navigate('reset_pin', {otp: values.verificationCode});
  };

  return (
    <ModalContainer
      title={
        <FormattedMessage
          id="verify_identity"
          defaultMessage="Verify your identity"
        />
      }>
      <View style={container}>
        <AppText variant="body1" style={detailStyle(theme)}>
          <FormattedMessage
            id="we_have_sent_otp"
            values={{
              phone_number: splitPhoneNumber(phoneNubmer),
            }}
          />
        </AppText>
        <TouchableOpacity disabled={isTimerStarted} onPress={handleSendPress}>
          <AppText variant="body1" style={detailStyle(theme)}>
            {isTimerStarted ? (
              <FormattedMessage
                id="resend_in_seconds"
                values={{
                  seconds_left: timeLeft,
                }}
              />
            ) : (
              <FormattedMessage id="resend_verification_code" />
            )}
          </AppText>
        </TouchableOpacity>
        <Formik
          initialValues={{
            verificationCode: '',
          }}
          onSubmit={handleSubmitPress}
          validate={validate}>
          <SendOtpForm />
        </Formik>
      </View>
    </ModalContainer>
  );
};

export default VerifyIdentityScreen;
