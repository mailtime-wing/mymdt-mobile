import React, {useContext, useState} from 'react';
import {ScrollView} from 'react-native';

import {AuthContext} from '@/context/auth';
import {FormattedMessage} from 'react-intl';
import {GET_OTP_API, REGISTER_API} from '@/api/auth';
import {useMutation} from '@apollo/react-hooks';
import {IntlContext} from '@/context/Intl';
import PopupModal from '@/components/PopupModal';

import LoginForm from '@/components/LoginForm';

import errorCodeEnum from '@/enum/errorCode';

const SignUpScreen = ({navigation}) => {
  const {localeEnum} = useContext(IntlContext);
  const {updateAuthToken} = useContext(AuthContext);
  const [otpRequest] = useMutation(GET_OTP_API);
  const [registerRequest] = useMutation(REGISTER_API);
  const [clientError, setClientError] = useState(null);

  const handleClientError = errorCode => {
    switch (errorCode) {
      case errorCodeEnum['202']:
        setClientError(
          <FormattedMessage
            id="error_code_202"
            defaultMessage="Verification Code invalid."
          />,
        );
        break;
      case errorCodeEnum['203']:
        setClientError(
          <FormattedMessage
            id="error_code_203"
            defaultMessage="Verification Code invalid."
          />,
        );
        break;
      // case errorCodeEnum['305']:
      //   setClientError(
      //     <FormattedMessage
      //       id="error_code_305"
      //       defaultMessage="User already exist."
      //     />,
      //   );
      //   break;
      default:
        setClientError(
          <FormattedMessage
            id="error_code_100"
            defaultMessage="System Error, Please try again later."
          />,
        );
        break;
    }
  };

  const handleSendPress = async values => {
    try {
      await otpRequest({
        variables: {
          phoneNumber: values.phonePrefix + values.phone,
          locale: localeEnum,
          action: 'REGISTER',
        },
      });
    } catch (e) {
      const errorCode = e?.graphQLErrors[0]?.extensions?.code;
      handleClientError(errorCode);
    }
  };

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
      await updateAuthToken(
        data.register.accessToken,
        data.register.refreshToken,
      );
      navigation.navigate('user_profile');
    } catch (e) {
      const errorCode = e?.graphQLErrors[0]?.extensions?.code;
      handleClientError(errorCode);
    }
  };

  return (
    <ScrollView>
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
      {!!clientError && (
        <PopupModal
          title={
            <FormattedMessage
              id="login_or_register_fail"
              defaultMessage="Login or register fail"
            />
          }
          detail={clientError}
          callback={() => setClientError(null)}
        />
      )}
    </ScrollView>
  );
};

export default SignUpScreen;
