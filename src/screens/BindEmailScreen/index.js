import React, {useEffect, useLayoutEffect, useContext} from 'react';
import {View} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';
import {Formik} from 'formik';
import {useTheme} from 'emotion-theming';
import SafeAreaView from 'react-native-safe-area-view';

import AppText from '@/components/AppText2';
import Input from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import BackButton from '@/components/BackButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import HeaderTitle from '@/components/HeaderTitle';
import useSetupFlow from '@/hooks/useSetupFlow';
import useMailTimeSdk from '@/hooks/useMailTimeSdk';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_EMAIL_ACCOUNTS_API} from '@/api/data';
import ToastContext from '@/context/toast';
import errorCodeEnum from '@/enum/errorCode';

import {container, innerContainer, formContainer, detailStyle} from './style';

const BindEmailScreen = ({route, navigation}) => {
  const navigateFromEdit = route?.params?.navigateFromEdit;
  const intl = useIntl();
  const {login, loading: sdkLoading, loginSuccess, error} = useMailTimeSdk();
  // TODO: handle error
  const {data, loading: fetchLoading} = useQueryWithAuth(
    GET_USER_EMAIL_ACCOUNTS_API,
    {
      fetchPolicy: 'network-only',
    },
  );

  const {navigateByFlow} = useSetupFlow();
  const theme = useTheme();
  const {addToast} = useContext(ToastContext);

  useEffect(() => {
    if (loginSuccess) {
      if (navigateFromEdit) {
        return navigation.pop(2);
      }
      navigateByFlow('next', {loginSuccess: true});
    }
  }, [loginSuccess, navigateFromEdit, navigation, navigateByFlow]);

  useEffect(() => {
    if (error) {
      if (error.graphQLErrors) {
        error.graphQLErrors.map((graphQLError) => {
          const code = graphQLError.extensions?.code;
          if (!code) {
            return;
          }
          switch (code) {
            case errorCodeEnum.DATA_ALREADY_EXIST: {
              addToast({
                text: intl.formatMessage({
                  id: 'this_email_is_already_bound',
                }),
                variant: 'error',
              });
              return;
            }
          }
        }, []);
        return;
      }

      addToast({
        text: intl.formatMessage({
          id: 'error.something_went_wrong_please_try_again_later',
        }),
        variant: 'error',
      });
    }
  }, [error, addToast, intl]);

  const handleConnectPress = (values) => {
    login(values.email);
  };

  useLayoutEffect(() => {
    if (navigateFromEdit) {
      navigation.setOptions({
        headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      });
    }
  }, [navigation, navigateFromEdit]);

  if (fetchLoading) {
    return <LoadingSpinner />;
  }

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = (
        <FormattedMessage id="error.required" defaultMessage="Required" />
      );
    }

    const emailRegex = /[^@]+@[^.]+\..+/;
    if (!errors.email && !emailRegex.test(values.email)) {
      errors.email = (
        <FormattedMessage
          id="error.please_input_valid_email"
          defaultMessage="Please input valid email"
        />
      );
    }

    if (
      !errors.email &&
      data?.userProfile?.emailAccounts?.some(
        (emailAccount) => emailAccount.emailAddress === values.email,
      )
    ) {
      errors.email = (
        <FormattedMessage
          id="this_email_is_already_bound"
          defaultMessage="This email is already bound to an account"
        />
      );
    }
    return errors;
  };

  return (
    <SafeAreaView style={container} forceInset={{bottom: 'always'}}>
      <HeaderTitle>
        <FormattedMessage
          id="bind_email_accounts"
          defaultMessage="Bind Emails"
        />
      </HeaderTitle>
      <View style={innerContainer(theme)}>
        <AppText variant="body1" style={detailStyle(theme)}>
          <FormattedMessage id="dont_worry" />
        </AppText>
        <Formik
          initialValues={{email: ''}}
          onSubmit={handleConnectPress}
          validate={validate}>
          {({handleSubmit, isValid}) => (
            <View style={formContainer}>
              <Input
                label={<FormattedMessage id="email" defaultMessage="Email" />}
                required
                name="email"
                keyboardType="email-address"
              />
              <AppButton
                onPress={handleSubmit}
                disabled={!isValid || sdkLoading}
                text={
                  <FormattedMessage
                    id="button.connect"
                    defaultMessage="Connect"
                  />
                }
                variant="filled"
                sizeVariant="large"
                colorVariant="secondary">
                {sdkLoading && (
                  <LoadingSpinner
                    color={theme.colors.textOnThemeBackground.mediumEmphasis}
                    size="small"
                  />
                )}
              </AppButton>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default BindEmailScreen;
