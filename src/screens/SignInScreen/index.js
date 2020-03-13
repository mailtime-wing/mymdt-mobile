import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {AuthContext} from '@/context/auth';
import {FormattedMessage} from 'react-intl';

import Input from '@/components/Input';
import Button from '@/components/Button';
import {Container, Title, VerificationContainer, LoginAndAgree} from './style';

const SigninScreen = ({route, navigation}) => {
  const {signIn} = useContext(AuthContext);
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [submitEnable, setSubmitEnable] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const {isSignUp, selectedBrands} = route.params;

  const onPressHandler = () => {
    if (phone === '' || verificationCode === '') {
      Alert.alert('please input both phone and verificationCode');
    } else {
      if (isSignUp) {
        // signUp(phone, verificationCode);
        let data = {
          phone: phone,
          verificationCode: verificationCode,
          selectedBrands: selectedBrands,
        };
        navigation.navigate('user_profile', data);
      } else {
        signIn(phone, verificationCode);
      }
    }
  };

  const verificationCodeOnPressHandler = () => {
    Alert.alert('verification code sent!');
    setVerificationCodeSent(true);
  };

  useEffect(() => {
    if (phone !== '' && verificationCode !== '') {
      setSubmitEnable(true);
    } else {
      setSubmitEnable(false);
    }
  }, [phone, verificationCode]);

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
          <Button small onPress={verificationCodeOnPressHandler}>
            <Text>
              {verificationCodeSent ? (
                <FormattedMessage id="resend_verification_code" />
              ) : (
                <FormattedMessage id="send_verification_code" />
              )}
            </Text>
          </Button>
        </VerificationContainer>
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
