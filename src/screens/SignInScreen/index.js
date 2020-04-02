import React, {useContext, useEffect, useReducer} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import CarrierInfo from 'react-native-carrier-info';
import {AuthContext} from '@/context/auth';
import {FormattedMessage, useIntl} from 'react-intl';
import {GET_OTP_API, LOGIN_API} from '@/api/auth';
import {useMutation} from '@apollo/react-hooks';
import {Formik, useFormikContext} from 'formik';

import Input from '@/components/Input';
import Button from '@/components/Button';
import {
  Container,
  Title,
  VerificationContainer,
  LoginAndAgree,
  Error,
} from './style';
import countryCodeData from './countryCode';

const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';

const ENABLE_SEND_OTP = 'enableSendOtp';
const SET_FORM_TYPE = 'setFormType';
const SEND_OTP = 'sendOtp';

const initialState = {
  sendCount: 0,
  enableSendOtp: true,
  formType: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ENABLE_SEND_OTP: {
      return {
        ...state,
        enableSendOtp: true,
      };
    }
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
        enableSendOtp: false,
      };
    }
    default:
      throw new Error();
  }
};

const SignInForm = ({isSignUp}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const intl = useIntl();
  const [otpRequest] = useMutation(GET_OTP_API);
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
          }
        }
      } catch (e) {
        // handle error later
      }
    };
    getPhonePrefix();
  }, [setFieldValue]);

  const handlePhoneFocus = () => {
    if (
      values.phonePrefix !== '' &&
      !values.phone.includes(values.phonePrefix + ' ')
    ) {
      setFieldValue('phone', values.phonePrefix + ' ');
    }
  };

  const verificationCodeCoolDown = second => {
    setTimeout(() => dispatch({type: ENABLE_SEND_OTP}), second * 1000);
  };

  const handleSendPress = async () => {
    dispatch({type: SEND_OTP});
    try {
      await otpRequest({
        variables: {
          phoneNumber: values.phone,
          locale: intl.locale,
          action: state.formType,
        },
      });
      verificationCodeCoolDown(60);
    } catch (e) {
      console.error('error on otpRequest with ', state.formType);
    }
  };

  return (
    <View>
      <Input
        type="telephoneNumber"
        onChangeText={handleChange('phone')}
        onFocus={() => handlePhoneFocus(values, setFieldValue)}
        value={values.phone}
        label={<FormattedMessage id="telephone" />}
        error={errors.phone}
      />
      <VerificationContainer>
        <Input
          type="oneTimeCode"
          onChangeText={handleChange('verificationCode')}
          value={values.verificationCode}
          label={<FormattedMessage id="verification_code" />}
          error={errors.verificationCode}
        />
        <Button
          small
          disabled={!state.enableSendOtp || errors.phone}
          onPress={handleSendPress}>
          <Text>
            {state.sendCount > 0 ? (
              <FormattedMessage id="resend_verification_code" />
            ) : (
              <FormattedMessage id="send_verification_code" />
            )}
          </Text>
        </Button>
      </VerificationContainer>
      <Button onPress={handleSubmit} title="Submit" disabled={!isValid}>
        <FormattedMessage id="submit" />
      </Button>
    </View>
  );
};

const SigninScreen = ({route, navigation}) => {
  const {isSignUp, selectedBrands} = route.params;
  const {updateAuthToken} = useContext(AuthContext);
  const [loginRequest, {error}] = useMutation(LOGIN_API);

  const handleSubmitPress = async values => {
    if (isSignUp) {
      let userData = {
        phone: values.phone,
        verificationCode: values.verificationCode,
        selectedBrands: selectedBrands,
      };
      navigation.navigate('user_profile', userData);
    } else {
      try {
        const {data} = await loginRequest({
          variables: {
            phoneNumber: values.phone,
            otp: values.verificationCode,
          },
        });
        updateAuthToken(data.login.accessToken);
      } catch (e) {}
    }
  };

  const validate = values => {
    const errors = {};

    if (!values.phone) {
      errors.phone = 'Phone Required';
    } else {
      if (!values.phone.includes('+') || !values.phone.includes(' ')) {
        errors.phone =
          'Phone number with prefix number required! e.g. +852 xxxxxxxx';
      }
    }

    if (!values.verificationCode) {
      errors.verificationCode = 'OTP Required';
    }

    return errors;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Title>
          {isSignUp ? (
            <FormattedMessage id="register_with_phone" />
          ) : (
            <FormattedMessage id="connect_with_phone" />
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
        {error && <Text>login / register fail. {error.message}</Text>}
        {!isSignUp && (
          <LoginAndAgree>
            <FormattedMessage
              id="login_in_agree_terms_and_policy"
              defaultMessage="By logging in your email address, you agree with MailTime’s Terms and Service and Privacy Policy."
              // values={{
              //   Text: str => (
              //     <Link onPress={() => Alert.alert('terms!')}>{str}</Link>
              //   ), // TODO: rich formatting not work in rn
              // }}
            />
          </LoginAndAgree>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SigninScreen;
