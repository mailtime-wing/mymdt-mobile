import React, {useContext} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {AuthContext} from '@/context/auth';
import {GET_OTP_API, REGISTER_API} from '@/api/auth';
import {useMutation} from '@apollo/react-hooks';
import {Formik, useFormikContext} from 'formik';
import {IntlContext} from '@/context/Intl';
import useCountDownTimer from '@/hooks/timer';

import Input from '@/components/Input';
import ThemeButton from '@/components/ThemeButton';
import {
  Container,
  Title,
  VerificationContainer,
  VerifyDetail,
  ResendCodeButton,
  ResendCode,
} from './style';

const REGISTER = 'REGISTER';

const VerifyPhoneNumberForm = ({phone}) => {
  const {localeEnum} = useContext(IntlContext);
  const [otpRequest] = useMutation(GET_OTP_API);
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isValid,
    touched,
  } = useFormikContext();
  const [timeLeft, setCountdownTime] = useCountDownTimer(60);
  const isTimerStarted = timeLeft > 0;

  const handleSendPress = async () => {
    try {
      await otpRequest({
        variables: {
          phoneNumber: phone,
          locale: localeEnum,
          action: REGISTER,
        },
      });
      setCountdownTime(60);
    } catch (e) {
      // console.error(`error on otpRequest with ${state.formType}: ${e}`);
    }
  };

  return (
    <View>
      <VerifyDetail>
        <FormattedMessage
          id="we_have_sent_otp"
          defaultMessage="We have sent you the verification code to {phone_number}. Didn’t receive the code?"
          values={{
            phone_number: phone,
          }}
        />
      </VerifyDetail>
      <ResendCodeButton disabled={isTimerStarted} onPress={handleSendPress}>
        <ResendCode>
          <FormattedMessage
            id="resend_the_code"
            defaultMessage="Resend the Code"
          />
          {isTimerStarted && ' ' + timeLeft}
        </ResendCode>
      </ResendCodeButton>
      <VerificationContainer>
        <Input
          keyboardType="number-pad"
          onChangeText={handleChange('verificationCode')}
          value={values.verificationCode}
          label={
            <FormattedMessage
              id="verification_code"
              defaultMessage="VERIFICATION CODE"
            />
          }
          error={touched.verificationCode && errors.verificationCode}
        />
      </VerificationContainer>
      <ThemeButton onPress={handleSubmit} disabled={!isValid}>
        <FormattedMessage id="submit" defaultMessage="SUBMIT" />
      </ThemeButton>
    </View>
  );
};

const VerifyPhoneNumberScreen = ({route, navigation}) => {
  const {phone, selectedOffers} = route.params;
  const {localeEnum} = useContext(IntlContext);
  const {updateAuthToken} = useContext(AuthContext);
  const [registerRequest] = useMutation(REGISTER_API);

  const handleSubmitPress = async values => {
    try {
      const {data} = await registerRequest({
        variables: {
          phoneNumber: phone,
          otp: values.verificationCode,
          subscribedOfferIds: selectedOffers.map(offer => offer.id),
          locale: localeEnum,
        },
      });
      await updateAuthToken(
        data.register.accessToken,
        data.register.refreshToken,
      );
      navigation.navigate('user_profile');
    } catch (e) {
      console.error('error in handleSubmitPress: ', e);
    }
  };

  const validate = values => {
    const errors = {};

    if (!values.verificationCode) {
      errors.verificationCode = 'OTP Required';
    }

    if (values.verificationCode.length !== 6) {
      errors.verificationCode = 'OTP is a 6 digit number';
    }

    return errors;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Title>
          <FormattedMessage
            id="verify_phone_number"
            defaultMessage="Verify phone number"
          />
        </Title>
        <Formik
          initialValues={{
            verificationCode: '',
          }}
          onSubmit={values => handleSubmitPress(values)}
          validate={values => validate(values)}>
          <VerifyPhoneNumberForm phone={phone} />
        </Formik>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default VerifyPhoneNumberScreen;
