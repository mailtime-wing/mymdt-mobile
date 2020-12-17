import React, {useEffect, useLayoutEffect} from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {Formik} from 'formik';
import {useTheme} from 'emotion-theming';
import SafeAreaView from 'react-native-safe-area-view';

import AppText from '@/components/AppText2';
import Input from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import BackButton from '@/components/BackButton';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import HeaderTitle from '@/components/HeaderTitle';
import useSetupFlow from '@/hooks/useSetupFlow';
import useMailTimeSdk from '@/hooks/useMailTimeSdk';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_EMAIL_ACCOUNTS_API} from '@/api/data';

import {container, innerContainer, formContainer, detailStyle} from './style';

const BindEmailScreen = ({route, navigation}) => {
  const navigateFromEdit = route?.params?.navigateFromEdit;
  const {
    login,
    reset,
    loading: sdkLoading,
    loginSuccess,
    loginFail,
  } = useMailTimeSdk();
  // TODO: handle error
  const {data, loading: fetchLoading} = useQueryWithAuth(
    GET_USER_EMAIL_ACCOUNTS_API,
    {
      fetchPolicy: 'network-only',
    },
  );

  const {navigateByFlow} = useSetupFlow();
  const theme = useTheme();

  useEffect(() => {
    if (loginSuccess) {
      if (navigateFromEdit) {
        return navigation.pop(2);
      }
      navigateByFlow('next', {loginSuccess: true});
    }
  }, [loginSuccess, navigateFromEdit, navigation, navigateByFlow]);

  const handleConnectPress = (values) => {
    login(values.email);
  };

  const handlePopupPress = () => {
    reset();
  };

  useLayoutEffect(() => {
    if (navigateFromEdit) {
      navigation.setOptions({
        headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      });
    }
  }, [navigation, navigateFromEdit]);

  if (sdkLoading || fetchLoading) {
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
                disabled={!isValid}
                text={
                  <FormattedMessage
                    id="button.connect"
                    defaultMessage="Connect"
                  />
                }
                variant="filled"
                sizeVariant="large"
                colorVariant="secondary"
              />
            </View>
          )}
        </Formik>
      </View>
      {loginFail && (
        <PopupModal
          title="Fail"
          detail="Login Fail"
          callback={handlePopupPress}
        />
      )}
    </SafeAreaView>
  );
};

export default BindEmailScreen;
