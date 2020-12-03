import React, {useContext, useEffect, useCallback, useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import {Formik, useFormikContext} from 'formik';

import {GET_OTP_API} from '@/api/auth';
import {IntlContext} from '@/context/Intl';
import useMutationWithReset from '@/hooks/useMutationWithReset';
import useCountDownTimer from '@/hooks/timer';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import Input from '@/components/AppInput';
import HeaderTitle from '@/components/HeaderTitle';
import AppKeyboardAvoidingView from '@/components/AppKeyboardAvoidingView';

import {container, inner, formBody, detailStyle, input} from './style';

const SubmitButton = (props) => {
  const {handleSubmit, isValid} = useFormikContext();

  return (
    <AppButton
      onPress={handleSubmit}
      disabled={!isValid}
      variant="filled"
      sizeVariant="large"
      colorVariant="secondary"
      {...props}
    />
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.verificationCode) {
    errors.verificationCode = (
      <FormattedMessage id="error.required" defaultMessage="Required" />
    );
  }

  if (!!values.verificationCode && values.verificationCode.length !== 6) {
    errors.verificationCode = (
      <FormattedMessage
        id="error.invalid_otp"
        defaultMessage="OTP is a 6 digit number"
      />
    );
  }

  return errors;
};

const VerifyVerificationCodeForm = ({
  title,
  description,
  submitButtonText,
  onSubmit,
  phoneNubmer,
  otpActionKey,
  startCountdownOnMount,
  initialCountdownSeconds,
  requestOtpOnMount,
}) => {
  const theme = useTheme();
  const {localeEnum} = useContext(IntlContext);
  const [otpRequest] = useMutationWithReset(GET_OTP_API, {}, {withAuth: true});
  const [timeLeft, setCountdownTime] = useCountDownTimer(
    startCountdownOnMount ? initialCountdownSeconds : 0,
  );
  const mountedRef = useRef(false);

  const isTimerStarted = timeLeft > 0;
  const handleSendPress = useCallback(() => {
    setCountdownTime(60);
    otpRequest({
      variables: {
        phoneNumber: phoneNubmer,
        locale: localeEnum,
        action: otpActionKey,
      },
    });
  }, [localeEnum, otpActionKey, otpRequest, phoneNubmer, setCountdownTime]);

  useEffect(() => {
    if (!mountedRef.current) {
      if (requestOtpOnMount && phoneNubmer) {
        handleSendPress();
      }

      mountedRef.current = true;
    }
  }, [
    handleSendPress,
    phoneNubmer,
    requestOtpOnMount,
    startCountdownOnMount,
    setCountdownTime,
  ]);

  return (
    <Formik
      initialValues={{
        verificationCode: '',
      }}
      onSubmit={onSubmit}
      validate={validate}>
      <AppKeyboardAvoidingView style={container} behavior="padding">
        <View style={inner}>
          <View>
            {title && <HeaderTitle>{title}</HeaderTitle>}
            <View style={formBody}>
              <AppText variant="body1" style={detailStyle(theme)}>
                {description}
              </AppText>
              <TouchableOpacity
                disabled={isTimerStarted}
                onPress={handleSendPress}>
                <AppText
                  variant="body1"
                  style={[
                    detailStyle(theme),
                    !isTimerStarted && {color: theme.colors.secondary.dark},
                  ]}>
                  {isTimerStarted ? (
                    <FormattedMessage
                      id="resend_in_seconds"
                      values={{
                        seconds_left: timeLeft,
                      }}
                    />
                  ) : (
                    <FormattedMessage id="button.resend_verification_code" />
                  )}
                </AppText>
              </TouchableOpacity>
              <Input
                style={input}
                keyboardType="number-pad"
                label={
                  <FormattedMessage
                    id="verification_code"
                    defaultMessage="VERIFICATION CODE"
                  />
                }
                name="verificationCode"
              />
            </View>
          </View>
          <View style={formBody}>
            <SubmitButton text={submitButtonText} />
          </View>
        </View>
      </AppKeyboardAvoidingView>
    </Formik>
  );
};

export default VerifyVerificationCodeForm;
