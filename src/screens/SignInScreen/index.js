import React, {useContext, useState, useEffect, useReducer} from 'react';
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

const SigninScreen = ({route, navigation}) => {
  const {isSignUp, selectedBrands} = route.params;
  const intl = useIntl();
  const {updateAuthToken} = useContext(AuthContext);
  const [otpRequest] = useMutation(GET_OTP_API);
  const [loginRequest, {error}] = useMutation(LOGIN_API);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [phone, setPhone] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

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
    if (phone === '' || verificationCode === '') {
      dispatch({type: ENABLE_SUBMIT_FORM, payload: false});
    } else {
      dispatch({type: ENABLE_SUBMIT_FORM, payload: true});
    }
  }, [phone, verificationCode]);

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
            setPhonePrefix(dialCode);
          }
        }
      } catch (e) {
        // handle error later
      }
    };
    getPhonePrefix();
  }, []);

  const handlePhoneFocus = () => {
    if (phonePrefix !== '' && !phone.includes(phonePrefix + ' ')) {
      setPhone(phonePrefix + ' ');
    }
  };

  const handleSubmitPress = async () => {
    if (!state.enableSubmitForm) {
      Alert.alert('please input both phone and verificationCode');
    } else {
      if (isSignUp) {
        let userData = {
          phone: phone,
          verificationCode: verificationCode,
          selectedBrands: selectedBrands,
        };
        navigation.navigate('user_profile', userData);
      } else {
        try {
          const {data} = await loginRequest({
            variables: {
              phoneNumber: phone,
              otp: verificationCode,
            },
          });
          updateAuthToken(data.login.accessToken);
        } catch (e) {}
      }
    }
  };

  const verificationCodeCoolDown = second => {
    setTimeout(() => dispatch({type: ENABLE_SEND_OTP}), second * 1000);
  };

  const handleSendPress = async () => {
    if (phone !== '' && phone.includes('+') && phone.includes(' ')) {
      dispatch({type: SEND_OTP});
      try {
        await otpRequest({
          variables: {
            phoneNumber: phone,
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Title>
          {isSignUp ? (
            <FormattedMessage id="register_with_phone" />
          ) : (
            <FormattedMessage id="connect_with_phone" />
          )}
        </Title>
        <View>
          <Input
            type="telephoneNumber"
            onChangeText={text => setPhone(text)}
            onFocus={() => handlePhoneFocus(phone)}
            value={phone}
            label={<FormattedMessage id="telephone" />}
          />
        </View>
        <VerificationContainer>
          <Input
            type="oneTimeCode"
            onChangeText={text => setVerificationCode(text)}
            value={verificationCode}
            label={<FormattedMessage id="verification_code" />}
          />
          <Button
            small
            disabled={!state.enableSendOtp}
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
        {error && <Text>login / register fail. {error.message}</Text>}
        <Button onPress={handleSubmitPress} disabled={!state.enableSubmitForm}>
          <FormattedMessage id="submit" />
        </Button>
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
