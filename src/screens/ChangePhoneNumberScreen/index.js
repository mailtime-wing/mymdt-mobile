import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';

import {IntlContext} from '@/context/Intl';
import {GET_OTP_API, CHANGE_PHONE_NUMBER_API} from '@/api/auth';
import useMutationWithReset from '@/hooks/useMutationWithReset';
import PopupModal from '@/components/PopupModal';
import LoginForm from '@/components/LoginForm';
import ScreenContainer from '@/components/ScreenContainer';
import errorCodeEnum from '@/enum/errorCode';

const renderClientError = (errorCode) => {
  if (!errorCode) {
    return null;
  }

  switch (errorCode) {
    case errorCodeEnum.DATA_INVALID:
      return (
        <FormattedMessage
          id="error.verificaion_code_invalid"
          defaultMessage="Verification Code invalid."
        />
      );
    case errorCodeEnum.DATA_EXPIRED:
      return (
        <FormattedMessage
          id="error.verificaion_code_invalid"
          defaultMessage="Verification Code invalid."
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

const ChangePhoneNumberScreen = ({navigation, route}) => {
  const intl = useIntl();
  const {otp, pin} = route.params;
  const {localeEnum} = useContext(IntlContext);
  const [
    otpRequest,
    {error: otpRequestError},
    otpRequestReset,
  ] = useMutationWithReset(GET_OTP_API, {}, {withAuth: true});
  const [
    changePhoneNumberRequest,
    {error},
    changePhoneNumberRequestReset,
  ] = useMutationWithReset(CHANGE_PHONE_NUMBER_API, {}, {withAuth: true});

  const apiError = otpRequestError || error;
  const errorCode = apiError?.graphQLErrors[0]?.extensions?.code;
  const clientError = renderClientError(errorCode);

  const reset = () => {
    otpRequestReset();
    changePhoneNumberRequestReset();
  };

  const handleSendPress = (values) =>
    otpRequest({
      variables: {
        phoneNumber: values.phonePrefix + values.phone,
        locale: localeEnum,
        action: 'CHANGE_PHONE_NUMBER',
      },
    });

  const handleSubmitPress = async (values) => {
    try {
      const {data} = await changePhoneNumberRequest({
        variables: {
          oldPhoneOtp: otp,
          newPhoneOtp: values.verificationCode,
          pin: pin,
        },
      });

      if (data) {
        navigation.navigate('phone_success', {
          phone_action: intl.formatMessage(
            {
              id: 'phone_successfully_with_action',
              defaultMessage: intl.messages.phone_successfully_with_action,
            },
            {
              action: intl.formatMessage({
                id: 'phone_action_changed',
                defaultMessage: intl.messages.phone_action_changed,
              }),
            },
          ),
        });
      }
    } catch (e) {}
  };

  return (
    <ScrollView>
      <ScreenContainer hasTopBar>
        <LoginForm
          title={<FormattedMessage id="change_phone_number" />}
          submitButtonText={
            <FormattedMessage id="button.submit" defaultMessage="Submit" />
          }
          onSendPress={handleSendPress}
          onSubmit={handleSubmitPress}
        />
      </ScreenContainer>
      {!!clientError && (
        <PopupModal
          title={
            <FormattedMessage
              id="error.change_phone_number_fail"
              defaultMessage="Change phone number fail"
            />
          }
          detail={clientError}
          callback={reset}
        />
      )}
    </ScrollView>
  );
};

export default ChangePhoneNumberScreen;
