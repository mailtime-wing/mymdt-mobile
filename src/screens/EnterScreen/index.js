import React, {useContext} from 'react';
import {Text} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';
import SafeAreaView from 'react-native-safe-area-view';
import {useMutation} from '@apollo/client';

import {IntlContext} from '@/context/Intl';
import LoginForm from '@/components/LoginForm';
import {GET_OTP_API} from '@/api/auth';
import errorCodeEnum from '@/enum/errorCode';

import {container, terms} from './style';
import {useTheme} from 'emotion-theming';
import inAppBrowser from '@/utils/inAppBrowser';
import urls from '@/constants/urls';

const EnterScreen = ({navigation}) => {
  const theme = useTheme();
  const {localeEnum} = useContext(IntlContext);
  const intl = useIntl();

  const [otpRequest, {loading}] = useMutation(GET_OTP_API, {
    context: {
      errorMessageHandler: {
        errorMap: {
          [errorCodeEnum.DATA_ALREADY_EXIST]: null,
          [errorCodeEnum.DATA_INVALID]: intl.formatMessage({
            id: 'error.enter_screen_invalid_phone_number',
          }),
          [errorCodeEnum.USER_NOT_EXIST]: intl.formatMessage({
            id: 'error.error_code_301',
          }),
          [errorCodeEnum.USER_ALREADY_EXIST]: intl.formatMessage({
            id: 'error.error_code_305',
          }),
          [errorCodeEnum.ACTION_NOT_AVAILABLE]: intl.formatMessage({
            id: 'error.enter_screen_action_not_available',
          }),
        },
      },
    },
  });

  const handleSubmitPress = async (values) => {
    const completePhoneNumber = values.phonePrefix + values.phone;
    try {
      await otpRequest({
        variables: {
          phoneNumber: completePhoneNumber,
          locale: localeEnum,
          action: 'ENTER',
        },
      });

      navigation.navigate('verify_enter', {phoneNubmer: completePhoneNumber});
    } catch (e) {
      if (e.graphQLErrors) {
        const errorCode = e.graphQLErrors[0]?.extensions?.code;
        const remainingSeconds = parseInt(
          e.graphQLErrors[0]?.extensions?.field,
          10,
        );
        if (
          errorCode === errorCodeEnum.DATA_ALREADY_EXIST &&
          !!remainingSeconds
        ) {
          navigation.navigate('verify_enter', {
            phoneNubmer: completePhoneNumber,
            remainingSeconds,
          });
        }
      }
    }
  };

  return (
    <SafeAreaView forceInset={{bottom: 'always'}} style={container}>
      <LoginForm
        title={<FormattedMessage id="welcome_to_reward_me" />}
        description={
          <FormattedMessage
            id="setting_up_agree_terms_and_policy"
            defaultMessage="By using the RewardMe service, you agree to RewardMe\u2019s <a>Terms of Service</a> and <b>Privacy Policy</b>."
            values={{
              a: (msg) => (
                <Text
                  style={terms(theme)}
                  onPress={() => inAppBrowser.open(urls.TERMS_OF_USE)}>
                  {msg}
                </Text>
              ),
              b: (msg) => (
                <Text
                  style={terms(theme)}
                  onPress={() => inAppBrowser.open(urls.PRIVACY_POLICY)}>
                  {msg}
                </Text>
              ),
            }}
          />
        }
        submitButtonText={
          <FormattedMessage
            id="button.send_verification_code"
            defaultMessage="send verification code"
          />
        }
        onSubmit={handleSubmitPress}
        otpLoading={loading}
      />
    </SafeAreaView>
  );
};

export default EnterScreen;
