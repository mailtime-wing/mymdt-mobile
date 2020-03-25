import React, {useContext, useState, useEffect} from 'react';
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
import {GET_OTP, LOGIN} from '@/api/auth';
import {useMutation} from '@apollo/react-hooks';

import Input from '@/components/Input';
import Button from '@/components/Button';
import {Container, Title, VerificationContainer, LoginAndAgree} from './style';
import countryCodeData from './countryCode';

const SigninScreen = ({route, navigation}) => {
  const intl = useIntl();
  const {updateAuthToken} = useContext(AuthContext);
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [submitEnable, setSubmitEnable] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState('');
  const {isSignUp, selectedBrands} = route.params;

  const [otpRequest] = useMutation(GET_OTP);
  const [loginRequest, {error}] = useMutation(LOGIN);

  useEffect(() => {
    if (phone === '' || verificationCode === '') {
      setSubmitEnable(false);
    } else {
      setSubmitEnable(true);
    }
  }, [phone, verificationCode]);

  useEffect(() => {
    // get phone prefix
    const getPhonePrefix = async () =>
      await CarrierInfo.isoCountryCode().then(result => {
        if (result) {
          setPhonePrefix(
            countryCodeData.find(c => c.code === result.toUpperCase())
              .dial_code,
          );
        } else {
          setPhonePrefix('');
        }
      });
    getPhonePrefix();
  }, []);

  const onChangeAutoFillPhonePrefix = () => {
    if (phonePrefix !== '' && !phone.includes(phonePrefix + ' ')) {
      setPhone(phonePrefix + ' ');
    }
  };

  const onPressHandler = async () => {
    if (phone === '' || verificationCode === '') {
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

  const verificationCodeOnPressHandler = () => {
    if (phone !== '' && phone.includes('+') && phone.includes(' ')) {
      otpRequest({
        variables: {
          phoneNumber: phone,
          locale: intl.locale,
          action: isSignUp ? 'REGISTER' : 'LOGIN',
        },
      });
      setVerificationCodeSent(true);
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
            onFocus={() => onChangeAutoFillPhonePrefix(phone)}
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
            disabled={phone === ''}
            onPress={verificationCodeOnPressHandler}>
            <Text>
              {verificationCodeSent ? (
                <FormattedMessage id="resend_verification_code" />
              ) : (
                <FormattedMessage id="send_verification_code" />
              )}
            </Text>
          </Button>
        </VerificationContainer>
        {error && <Text>login / register fail. {error.message}</Text>}
        <Button onPress={onPressHandler} disabled={!submitEnable}>
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
