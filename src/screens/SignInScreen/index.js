import React, {useContext, useEffect, useReducer} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import CarrierInfo from 'react-native-carrier-info';
import {AuthContext} from '@/context/auth';
import {FormattedMessage} from 'react-intl';
import {GET_OTP_API, LOGIN_API, REGISTER_API} from '@/api/auth';
import {useMutation} from '@apollo/react-hooks';
import {Formik, useFormikContext} from 'formik';
import {IntlContext} from '@/context/Intl';
import useCountDownTimer from '@/hooks/timer';

import Input from '@/components/Input';
import ThemeButton from '@/components/ThemeButton';
import PopupModal from '@/components/PopupModal';
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
  ScrollContainer,
  SignUpDetail,
} from './style';
import countryCodeData from '@/constants/countryCode';

const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';

const SET_FORM_TYPE = 'setFormType';
const SEND_OTP = 'sendOtp';
const initialState = {
  sendCount: 0,
  formType: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_FORM_TYPE: {
      return {
        ...state,
        formType: action.payload,
      };
    }
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

const SignInForm = ({isSignUp}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {localeEnum} = useContext(IntlContext);
  const [otpRequest, {error}] = useMutation(GET_OTP_API);
  const [timeLeft, setCountdownTime] = useCountDownTimer(0);
  const isTimerStarted = timeLeft > 0;

  const {
    values,
    setFieldValue,
    handleChange,
    handleSubmit,
    errors,
    isValid,
  } = useFormikContext();

  // get form type/action
  useEffect(() => {
    if (isSignUp) {
      dispatch({type: SET_FORM_TYPE, payload: REGISTER});
    } else {
      dispatch({type: SET_FORM_TYPE, payload: LOGIN});
    }
  }, [isSignUp]);

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
      } catch (e) {
        // handle error later
      }
      setFieldValue('phonePrefix', '+');
    };
    getPhonePrefix();
  }, [setFieldValue]);

  const handleSendPress = async () => {
    try {
      await otpRequest({
        variables: {
          phoneNumber: values.phonePrefix + values.phone,
          locale: localeEnum,
          action: state.formType,
        },
      });
      dispatch({type: SEND_OTP});
      setCountdownTime(60);
    } catch (e) {
      console.warn(`error on otpRequest with ${state.formType}: ${e}`);
    }
  };

  return (
    <View>
      <PhoneSectionContainer>
        <PhonePrefixContainer>
          <Input
            keyboardType="phone-pad"
            onChangeText={handleChange('phonePrefix')}
            value={values.phonePrefix}
            label={<FormattedMessage id="telephone" />}
            error={errors.phonePrefix}
          />
        </PhonePrefixContainer>
        <PhoneContainer>
          <Input
            keyboardType="phone-pad"
            onChangeText={handleChange('phone')}
            value={values.phone}
            error={errors.phone}
          />
        </PhoneContainer>
      </PhoneSectionContainer>
      <VerificationContainer>
        <VerificationCodeContainer>
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
            error={errors.verificationCode}
          />
        </VerificationCodeContainer>
        <ThemeButton
          small
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
      {isSignUp && (
        <SignUpDetail>
          <FormattedMessage
            id="we_will_send_otp"
            defaultMessage="We’ll send you a verification code to your phone via text message."
          />
        </SignUpDetail>
      )}
      <ThemeButton onPress={handleSubmit} disabled={!isValid}>
        {isSignUp ? (
          <FormattedMessage id="sign_up" defaultMessage="SIGN UP" />
        ) : (
          <FormattedMessage id="sign_in" defaultMessage="SIGN IN" />
        )}
      </ThemeButton>
      {error && <PopupModal title="OTP fail" detail={error.message} />}
    </View>
  );
};

const SigninScreen = ({route, navigation}) => {
  const {isSignUp} = route.params;
  const {localeEnum} = useContext(IntlContext);
  const {updateAuthToken} = useContext(AuthContext);
  const [loginRequest, {error}] = useMutation(LOGIN_API);
  const [registerRequest] = useMutation(REGISTER_API);

  const handleSubmitPress = async values => {
    const completePhoneNumber = values.phonePrefix + values.phone;
    if (isSignUp) {
      try {
        const {data} = await registerRequest({
          variables: {
            phoneNumber: completePhoneNumber,
            otp: values.verificationCode,
            locale: localeEnum,
          },
        });
        await updateAuthToken(
          data.register.accessToken,
          data.register.refreshToken,
        );
        navigation.navigate('user_profile');
      } catch (e) {
        console.warn(`error on ${REGISTER}: ${e}`);
      }
    } else {
      try {
        const {data} = await loginRequest({
          variables: {
            phoneNumber: completePhoneNumber,
            otp: values.verificationCode,
          },
        });
        updateUserAccountData({
          isEmailBound: data.login.isEmailBound,
          isProfileCompleted: data.login.isProfileCompleted,
          isCashbackCurrencyCodeSet: data.login.isCashbackCurrencyCodeSet,
          isBasicOfferSet: data.login.isBasicOfferSet,
        });
        updateAuthToken(data.login.accessToken, data.login.refreshToken);
      } catch (e) {
        console.warn(`error on ${LOGIN}: ${e}`);
      }
    }
  };

  const validate = values => {
    const errors = {};
    const dialCodeRegex = /^(\+)(\d{1,3}|\d{1,4})$/;

    if (!dialCodeRegex.test(values.phonePrefix)) {
      errors.phonePrefix = 'Required';
    }

    if (!values.phone) {
      errors.phone = 'Required';
    }

    if (!isSignUp) {
      if (!values.verificationCode) {
        errors.verificationCode = 'OTP Required';
      }

      if (values.verificationCode.length !== 6) {
        errors.verificationCode = 'OTP is a 6 digit number';
      }
    }

    return errors;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollContainer>
        <Container>
          <Title>
            {isSignUp ? (
              <FormattedMessage id="sign_up" defaultMessage="SIGN UP" />
            ) : (
              <FormattedMessage id="sign_in" defaultMessage="SIGN IN" />
            )}
          </Title>
          <Formik
            initialValues={{
              phone: '',
              phonePrefix: '',
              verificationCode: '',
            }}
            onSubmit={values => handleSubmitPress(values)}
            validate={values => validate(values)}>
            <SignInForm isSignUp={isSignUp} />
          </Formik>
          {!isSignUp && (
            <LoginAndAgree>
              <FormattedMessage
                id="login_in_agree_terms_and_policy"
                defaultMessage="By logging in your email address, you agree with RewardMe’s Terms of Service and Privacy Policy."
                // values={{
                //   Text: str => (
                //     <Link onPress={() => Alert.alert('terms!')}>{str}</Link>
                //   ), // TODO: rich formatting not work in rn
                // }}
              />
            </LoginAndAgree>
          )}
          {error && (
            <PopupModal title="Login or Register fail" detail={error.message} />
          )}
        </Container>
      </ScrollContainer>
    </TouchableWithoutFeedback>
  );
};

export default SigninScreen;
