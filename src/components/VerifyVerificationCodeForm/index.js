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

import {
  container,
  formContainer,
  titleStyle,
  detailStyle,
  button,
} from './style';

const SendOtpForm = ({submitButtonText}) => {
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
        text={submitButtonText}
        disabled={!isValid}
        variant="filled"
        sizeVariant="large"
        colorVariant="secondary"
        style={button}
      />
    </View>
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
}) => {
  const theme = useTheme();
  const {localeEnum} = useContext(IntlContext);
  const [otpRequest] = useMutationWithReset(GET_OTP_API, {}, {withAuth: true});
  const [timeLeft, setCountdownTime] = useCountDownTimer(0);
  const handleSendPressFiredRef = useRef(false);

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
    if (phoneNubmer && !handleSendPressFiredRef.current) {
      handleSendPress();
      handleSendPressFiredRef.current = true;
    }
  }, [handleSendPress, phoneNubmer]);

  return (
    <View style={container}>
      {title && (
        <AppText variant="pageTitle" style={titleStyle(theme)}>
          {title}
        </AppText>
      )}
      <AppText variant="body1" style={detailStyle(theme)}>
        {description}
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
            <FormattedMessage id="button.resend_verification_code" />
          )}
        </AppText>
      </TouchableOpacity>
      <Formik
        initialValues={{
          verificationCode: '',
        }}
        onSubmit={onSubmit}
        validate={validate}>
        <SendOtpForm submitButtonText={submitButtonText} />
      </Formik>
    </View>
  );
};

export default VerifyVerificationCodeForm;
