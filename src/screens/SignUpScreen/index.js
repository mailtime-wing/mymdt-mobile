import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {GET_OTP_API, REGISTER_API} from '@/api/auth';
import errorCodeEnum from '@/enum/errorCode';
import {AuthContext} from '@/context/auth';
import {IntlContext} from '@/context/Intl';
import PopupModal from '@/components/PopupModal';
import LoginForm from '@/components/LoginForm';
import ScreenContainer from '@/components/ScreenContainer';
import useMutationWithReset from '@/hooks/useMutationWithReset';

const renderClientError = errorCode => {
  if (!errorCode) {
    return null;
  }

  switch (errorCode) {
    case errorCodeEnum['202']:
      return (
        <FormattedMessage
          id="error.error_code_202"
          defaultMessage="Verification Code invalid."
        />
      );
    case errorCodeEnum['203']:
      return (
        <FormattedMessage
          id="error.error_code_203"
          defaultMessage="Verification Code invalid."
        />
      );
    case errorCodeEnum['305']:
      return (
        <FormattedMessage
          id="error.error_code_305"
          defaultMessage="User already exist."
        />
      );
    default:
      return (
        <FormattedMessage
          id="error.error_code_100"
          defaultMessage="System Error, Please try again later."
        />
      );
  }
};

const SignUpScreen = ({navigation}) => {
  const {localeEnum} = useContext(IntlContext);
  const {updateAuthToken} = useContext(AuthContext);
  const [
    otpRequest,
    {error: otpRequestError},
    otpRequestReset,
  ] = useMutationWithReset(GET_OTP_API);
  const [
    registerRequest,
    {error: registerRequestError},
    registerRequestReset,
  ] = useMutationWithReset(REGISTER_API);

  const error = otpRequestError || registerRequestError;
  const errorCode = error?.graphQLErrors[0]?.extensions?.code;
  const clientError = renderClientError(errorCode);

  const reset = mode => {
    otpRequestReset();
    registerRequestReset();

    if (mode === 'OK' && errorCode === errorCodeEnum[305]) {
      navigation.navigate('sign_in', {isSignUp: false});
    }
  };

  const handleSendPress = values =>
    otpRequest({
      variables: {
        phoneNumber: values.phonePrefix + values.phone,
        locale: localeEnum,
        action: 'REGISTER',
      },
    });

  const handleSubmitPress = async values => {
    const completePhoneNumber = values.phonePrefix + values.phone;
    try {
      const {data} = await registerRequest({
        variables: {
          phoneNumber: completePhoneNumber,
          otp: values.verificationCode,
          locale: localeEnum,
        },
      });
      updateAuthToken(data.register.accessToken, data.register.refreshToken);
    } catch (e) {}
  };

  return (
    <ScrollView>
      <ScreenContainer hasTopBar>
        <LoginForm
          title={<FormattedMessage id="sign_up" defaultMessage="SIGN UP" />}
          description={
            <FormattedMessage
              id="setting_up_agree_terms_and_policy"
              defaultMessage="By setting up the account, you agree with RewardMe’s Terms of Service and Privacy Policy."
            />
          }
          submitButtonText={
            <FormattedMessage id="sign_up" defaultMessage="SIGN UP" />
          }
          onSendPress={handleSendPress}
          onSubmit={handleSubmitPress}
        />
      </ScreenContainer>
      {!!clientError && (
        <PopupModal
          title={
            <FormattedMessage
              id="error.login_or_register_fail"
              defaultMessage="Login or register fail"
            />
          }
          detail={clientError}
          callback={reset}
          okButtonLabel={<FormattedMessage id="login" defaultMessage="login" />}
        />
      )}
    </ScrollView>
  );
};

export default SignUpScreen;
