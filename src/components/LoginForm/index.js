import React, {useEffect, useReducer} from 'react';
import {View, Text} from 'react-native';
import CarrierInfo from 'react-native-carrier-info';
import {FormattedMessage} from 'react-intl';

import {Formik, useFormikContext} from 'formik';
import useCountDownTimer from '@/hooks/timer';

import Input from '@/components/AppInput';
import ThemeButton from '@/components/ThemeButton';

import {
  Container,
  Title,
  VerificationContainer,
  LoginAndAgree,
  Error,
  PhoneSectionContainer,
  PhonePrefixContainer,
  PhoneContainer,
  VerificationCodeContainer,
} from './style';
import countryCodeData from '@/constants/countryCode';

const SEND_OTP = 'sendOtp';
const initialState = {
  sendCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SEND_OTP: {
      return {
        ...state,
        sendCount: state.sendCount + 1,
      };
    }
    default:
      throw new Error();
  }
};

const InternalLoginForm = ({submitButtonText, onSendPress}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timeLeft, setCountdownTime] = useCountDownTimer(0);
  const isTimerStarted = timeLeft > 0;

  const {
    values,
    setFieldValue,
    handleSubmit,
    errors,
    isValid,
  } = useFormikContext();

  // get phone prefix
  useEffect(() => {
    const getPhonePrefix = async () => {
      try {
        const result = await CarrierInfo.isoCountryCode();
        if (result) {
          let dialCode = countryCodeData.find(
            c => c.code === result.toUpperCase(),
          )?.dial_code;
          if (dialCode) {
            setFieldValue('phonePrefix', dialCode);
            return;
          }
        }
      } catch (e) {}
      setFieldValue('phonePrefix', '+');
    };
    getPhonePrefix();
  }, [setFieldValue]);

  const handleSendPress = async () => {
    try {
      setCountdownTime(60);
      dispatch({type: SEND_OTP});
      onSendPress(values);
    } catch (e) {}
  };

  return (
    <View>
      <PhoneSectionContainer>
        <PhonePrefixContainer>
          <Input
            keyboardType="phone-pad"
            label={<FormattedMessage id="telephone" />}
            name="phonePrefix"
          />
        </PhonePrefixContainer>
        <PhoneContainer>
          <Input keyboardType="phone-pad" name="phone" />
        </PhoneContainer>
      </PhoneSectionContainer>
      <VerificationContainer>
        <VerificationCodeContainer>
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
        </VerificationCodeContainer>
        <ThemeButton
          medium
          disabled={isTimerStarted || !!errors.phone}
          onPress={handleSendPress}>
          <Text>
            {state.sendCount > 0 ? (
              <FormattedMessage
                id="resend_verification_code"
                defaultMessage="SEND"
              />
            ) : (
              <FormattedMessage
                id="send_verification_code"
                defaultMessage="RESEND"
              />
            )}
            {isTimerStarted && ' ' + timeLeft}
          </Text>
        </ThemeButton>
      </VerificationContainer>
      <ThemeButton onPress={handleSubmit} disabled={!isValid}>
        {submitButtonText}
      </ThemeButton>
    </View>
  );
};

const validate = values => {
  const errors = {};
  const dialCodeRegex = /^(\+)(\d{1,3}|\d{1,4})$/;

  if (!dialCodeRegex.test(values.phonePrefix)) {
    errors.phonePrefix = (
      <FormattedMessage id="required" defaultMessage="Required" />
    );
  }

  if (!values.phone) {
    errors.phone = <FormattedMessage id="required" defaultMessage="Required" />;
  }

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

const LoginForm = ({
  title,
  description,
  submitButtonText,
  onSendPress,
  onSubmit,
}) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <Formik
        initialValues={{
          phone: '',
          phonePrefix: '',
          verificationCode: '',
        }}
        onSubmit={onSubmit}
        validate={validate}>
        <InternalLoginForm
          submitButtonText={submitButtonText}
          onSendPress={onSendPress}
        />
      </Formik>
      {description && <LoginAndAgree>{description}</LoginAndAgree>}
    </Container>
  );
};

export default LoginForm;
