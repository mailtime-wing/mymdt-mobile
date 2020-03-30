import React, {useContext, useEffect, useReducer} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import CarrierInfo from 'react-native-carrier-info';
import {AuthContext} from '@/context/auth';
import {FormattedMessage, useIntl} from 'react-intl';
import {GET_OTP_API, LOGIN_API} from '@/api/auth';
import {useMutation} from '@apollo/react-hooks';
import {Formik, useFormikContext} from 'formik';

import Input from '@/components/Input';
import Button from '@/components/Button';
import {Container, Title, VerificationContainer, LoginAndAgree} from './style';
import countryCodeData from './countryCode';

const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';

const ENABLE_SEND_OTP = 'enableSendOtp';
const ENABLE_SUBMIT_FORM = 'enableSubmitForm';
const SET_FORM_TYPE = 'setFormType';
const SEND_OTP = 'sendOtp';

const initialState = {
  sendCount: 0,
  enableSendOtp: true,
  enableSubmitForm: false,
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
    case ENABLE_SUBMIT_FORM: {
      return {
        ...state,
        enableSubmitForm: action.payload,
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
  } = useFormikContext();

  // get form type/action
  useEffect(() => {
    if (isSignUp) {
      dispatch({type: SET_FORM_TYPE, payload: REGISTER});
    } else {
      dispatch({type: SET_FORM_TYPE, payload: LOGIN});
    }
  }, [isSignUp]);

  // check form submit availability
  useEffect(() => {
    if (values.phone === '' || values.verificationCode === '') {
      dispatch({type: ENABLE_SUBMIT_FORM, payload: false});
    } else {
      dispatch({type: ENABLE_SUBMIT_FORM, payload: true});
    }
  }, [values.phone, values.verificationCode]);

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
    if (
      values.phone !== '' &&
      values.phone.includes('+') &&
      values.phone.includes(' ')
    ) {
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
    } else {
      Alert.alert(
        'you need to enter phone number with prefix number! e.g. +852 xxxxxxxx',
      );
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
      />
      <VerificationContainer>
        <Input
          type="oneTimeCode"
          onChangeText={handleChange('verificationCode')}
          value={values.verificationCode}
          label={<FormattedMessage id="verification_code" />}
        />
        <Button small disabled={!state.enableSendOtp} onPress={handleSendPress}>
          <Text>
            {state.sendCount > 0 ? (
              <FormattedMessage id="resend_verification_code" />
            ) : (
              <FormattedMessage id="send_verification_code" />
            )}
          </Text>
        </Button>
      </VerificationContainer>
      <Button
        onPress={handleSubmit}
        title="Submit"
        disabled={!state.enableSubmitForm}>
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
    if (!values.phone || !values.verificationCode) {
      Alert.alert('please input both phone and verificationCode');
    } else {
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
    }
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
          onSubmit={values => handleSubmitPress(values)}>
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
