import React, {useContext} from 'react';
import {useIntl} from 'react-intl';
import SafeAreaView from 'react-native-safe-area-view';

import {AuthContext} from '@/context/auth';
import {IntlContext} from '@/context/Intl';
import {NotificationContext} from '@/context/notification';
import {FormattedMessage} from 'react-intl';
import errorCodeEnum from '@/enum/errorCode';
import VerifyVerificationCodeForm from '@/components/VerifyVerificationCodeForm';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';

import splitPhoneNumber from '@/utils/splitPhoneNumber';
import {ENTER_API} from '@/api/auth';

import {container} from './style';

const VerifyEnterScreen = ({route}) => {
  const intl = useIntl();

  const [enterRequest] = useMutationWithAuth(ENTER_API, {
    context: {
      errorMessageHandler: {
        errorMap: {
          [errorCodeEnum.DATA_INVALID]: ({field}) => {
            switch (field) {
              case 'phoneNumber': {
                return intl.formatMessage(
                  {
                    id: 'error.error_code_202_with_field',
                  },
                  {
                    field: intl.formatMessage({
                      id: 'phone_number',
                    }),
                  },
                );
              }
              case 'otp': {
                return intl.formatMessage(
                  {
                    id: 'error.error_code_202_with_field',
                  },
                  {
                    field: intl.formatMessage({
                      id: 'verification_code',
                    }),
                  },
                );
              }
            }
          },
        },
      },
    },
  });
  const {phoneNubmer, remainingSeconds = 60} = route.params;
  const {localeEnum} = useContext(IntlContext);
  const {signIn} = useContext(AuthContext);
  const {
    state: {deviceId},
  } = useContext(NotificationContext);

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
      signIn(data.enter.accessToken, data.enter.refreshToken);
    } catch (e) {}
  };

  return (
    <SafeAreaView forceInset={{bottom: 'always'}} style={container}>
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
        startCountdownOnMount={true}
        initialCountdownSeconds={remainingSeconds}
        requestOtpOnMount={false}
      />
    </SafeAreaView>
  );
};

export default VerifyEnterScreen;
