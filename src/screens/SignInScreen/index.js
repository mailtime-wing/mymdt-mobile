import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {AuthContext} from '@/context/auth';
import {IntlContext} from '@/context/Intl';
import {NotificationContext} from '@/context/notification';
import {GET_OTP_API, LOGIN_API} from '@/api/auth';
import useMutationWithReset from '@/hooks/useMutationWithReset';
import PopupModal from '@/components/PopupModal';
import LoginForm from '@/components/LoginForm';
import ScreenContainer from '@/components/ScreenContainer';
import errorCodeEnum from '@/enum/errorCode';

const renderClientError = errorCode => {
  if (!errorCode) {
    return null;
  }

  switch (errorCode) {
    // case errorCodeEnum['200']:
    // case errorCodeEnum['301']:
    //   return (
    //     <FormattedMessage
    //       id="error_code_301"
    //       defaultMessage="User not exist."
    //     />
    //   );
    case errorCodeEnum['202']:
      return (
        <FormattedMessage
          id="error_code_202"
          defaultMessage="Verification Code invalid."
        />
      );
    case errorCodeEnum['203']:
      return (
        <FormattedMessage
          id="error_code_203"
          defaultMessage="Verification Code invalid."
        />
      );
    default:
      return (
        <FormattedMessage
          id="error_code_100"
          defaultMessage="System Error, Please try again later."
        />
      );
  }
};

const SigninScreen = () => {
  const {localeEnum} = useContext(IntlContext);
  const {updateAuthToken} = useContext(AuthContext);
  const {
    state: {deviceId},
  } = useContext(NotificationContext);
  const [
    otpRequest,
    {error: otpRequestError},
    otpRequestReset,
  ] = useMutationWithReset(GET_OTP_API);
  const [
    loginRequest,
    {error: loginRequestError},
    loginRequestReset,
  ] = useMutationWithReset(LOGIN_API);

  const error = otpRequestError || loginRequestError;
  const errorCode = error?.graphQLErrors[0]?.extensions?.code;
  const clientError = renderClientError(errorCode);

  const reset = () => {
    otpRequestReset();
    loginRequestReset();
  };

  const handleSendPress = values =>
    otpRequest({
      variables: {
        phoneNumber: values.phonePrefix + values.phone,
        locale: localeEnum,
        action: 'LOGIN',
      },
    });

  const handleSubmitPress = async values => {
    const completePhoneNumber = values.phonePrefix + values.phone;
    try {
      const {data} = await loginRequest({
        variables: {
          phoneNumber: completePhoneNumber,
          otp: values.verificationCode,
          deviceId,
        },
      });
      updateAuthToken(data.login.accessToken, data.login.refreshToken);
    } catch (e) {}
  };

  return (
    <ScrollView>
      <ScreenContainer hasTopBar>
        <LoginForm
          title={<FormattedMessage id="sign_in" defaultMessage="SIGN IN" />}
          description={
            <FormattedMessage
              id="login_in_agree_terms_and_policy"
              defaultMessage="By logging in your email address, you agree with RewardMe’s Terms of Service and Privacy Policy."
            />
          }
          submitButtonText={
            <FormattedMessage id="sign_in" defaultMessage="SIGN IN" />
          }
          onSendPress={handleSendPress}
          onSubmit={handleSubmitPress}
        />
      </ScreenContainer>
      {!!clientError && (
        <PopupModal
          title={
            <FormattedMessage
              id="login_or_register_fail"
              defaultMessage="Login or register fail"
            />
          }
          detail={clientError}
          callback={reset}
        />
      )}
    </ScrollView>
  );
};

export default SigninScreen;
