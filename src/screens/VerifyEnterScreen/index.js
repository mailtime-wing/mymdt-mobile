import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {AuthContext} from '@/context/auth';
import {IntlContext} from '@/context/Intl';
import {NotificationContext} from '@/context/notification';
import {FormattedMessage} from 'react-intl';
import errorCodeEnum from '@/enum/errorCode';
import VerifyVerificationCodeForm from '@/components/VerifyVerificationCodeForm';
import ScreenContainer from '@/components/ScreenContainer';
import useMutationWithReset from '@/hooks/useMutationWithReset';
import PopupModal from '@/components/PopupModal';

import splitPhoneNumber from '@/utils/splitPhoneNumber';
import {ENTER_API} from '@/api/auth';

const renderClientError = (errorCode) => {
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

const VerifyEnterScreen = ({route}) => {
  const [enterRequest, {error}, reset] = useMutationWithReset(ENTER_API);
  const {phoneNubmer} = route.params;
  const {localeEnum} = useContext(IntlContext);
  const {updateAuthToken} = useContext(AuthContext);
  const {
    state: {deviceId},
  } = useContext(NotificationContext);

  const errorCode = error?.graphQLErrors[0]?.extensions?.code;
  const clientError = renderClientError(errorCode);

  const handleVerifyPress = async (values) => {
    try {
      const {data} = await enterRequest({
        variables: {
          phoneNumber: phoneNubmer,
          otp: values.verificationCode,
          locale: localeEnum,
          deviceId,
        },
      });
      updateAuthToken(data.enter.accessToken, data.enter.refreshToken);
    } catch (e) {}
  };

  return (
    <ScrollView>
      <ScreenContainer hasTopBar>
        <VerifyVerificationCodeForm
          title={<FormattedMessage id="enter_verification_code" />}
          description={
            <FormattedMessage
              id="we_have_sent_otp"
              values={{
                phone_number: splitPhoneNumber(phoneNubmer),
              }}
            />
          }
          submitButtonText={
            <FormattedMessage id="button.verify" defaultMessage="Verify" />
          }
          phoneNubmer={phoneNubmer}
          otpActionKey="ENTER"
          onSubmit={handleVerifyPress}
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
          okButtonLabel={
            <FormattedMessage id="button.login" defaultMessage="login" />
          }
        />
      )}
    </ScrollView>
  );
};

export default VerifyEnterScreen;
