import React, {useEffect, useLayoutEffect} from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {Formik} from 'formik';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import Input from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import BackButton from '@/components/BackButton';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import ScreenContainer from '@/components/ScreenContainer';
import useSetupFlow from '@/hooks/useSetupFlow';
import useMailTimeSdk from '@/hooks/useMailTimeSdk';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_EMAIL_ACCOUNTS_API} from '@/api/data';

import {scrollContainer, detailStyle, title} from './style';

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
      navigateByFlow('next', {loginSuccess: true});
    }
  }, [loginSuccess, navigateByFlow]);

  const handleConnectPress = values => {
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

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = (
        <FormattedMessage id="required" defaultMessage="Required" />
      );
    }

    const emailRegex = /[^@]+@[^\.]+\..+/;
    if (!errors.email && !emailRegex.test(values.email)) {
      errors.email = (
        <FormattedMessage
          id="please_input_valid_email"
          defaultMessage="Please input valid email"
        />
      );
    }

    if (
      !errors.email &&
      data?.userProfile?.emailAccounts?.some(
        emailAccount => emailAccount.emailAddress === values.email,
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
    <ScrollView style={scrollContainer}>
      <ScreenContainer hasTopBar>
        <AppText variant="pageTitle" style={title(theme)}>
          <FormattedMessage
            id="bind_email_accounts"
            defaultMessage="BIND EMAILS"
          />
        </AppText>
        <AppText variant="body1" style={detailStyle(theme)}>
          <FormattedMessage id="dont_worry" />
        </AppText>
        <Formik
          initialValues={{email: ''}}
          onSubmit={handleConnectPress}
          validate={validate}>
          {({handleSubmit, isValid}) => (
            <>
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
                  <FormattedMessage id="connect" defaultMessage="Connect" />
                }
                variant="filled"
                sizeVariant="large"
                colorVariant="secondary"
              />
            </>
          )}
        </Formik>
        {loginFail && (
          <PopupModal
            title="Fail"
            detail="Login Fail"
            callback={handlePopupPress}
          />
        )}
      </ScreenContainer>
    </ScrollView>
  );
};

export default BindEmailScreen;
