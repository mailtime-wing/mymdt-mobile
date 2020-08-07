import React, {useState, useEffect, useLayoutEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import {Formik} from 'formik';

import Input from '@/components/AppInput';
import ThemeButton from '@/components/ThemeButton';
import BackButton from '@/components/BackButton';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import ScreenContainer from '@/components/ScreenContainer';
import useSetupFlow from '@/hooks/useSetupFlow';
import useMailTimeSdk from '@/hooks/useMailTimeSdk';

import {Title, Detail, ScrollContainer} from './style';

const BindEmailScreen = ({route, navigation}) => {
  const [unbindSuccess, setUnbindSuccess] = useState(false);
  const [clientError, setClientError] = useState('');
  const navigateFromEdit = route?.params?.navigateFromEdit;
  const {
    login,
    reset,
    loading: sdkLoading,
    error: sdkError,
    loginSuccess,
    loginFail,
    loginCancel,
  } = useMailTimeSdk();
  const {navigateByFlow} = useSetupFlow();

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

  if (sdkLoading) {
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
    if (!emailRegex.test(values.email)) {
      errors.email = (
        <FormattedMessage
          id="please_input_valid_email"
          defaultMessage="Please input valid email"
        />
      );
    }

    return errors;
  };

  return (
    <ScrollContainer>
      <ScreenContainer hasTopBar>
        <Title>
          <FormattedMessage
            id="bind_email_accounts"
            defaultMessage="BIND EMAILS"
          />
        </Title>
        <Detail>
          <FormattedMessage id="dont_worry" />
        </Detail>
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
              <ThemeButton disabled={!isValid} onPress={handleSubmit}>
                <FormattedMessage id="connect" defaultMessage="Connect" />
              </ThemeButton>
            </>
          )}
        </Formik>
        {loginCancel && (
          <PopupModal
            title="Cancelled"
            detail="Login Cancelled"
            callback={handlePopupPress}
          />
        )}
        {loginSuccess && (
          <PopupModal
            title="Success"
            detail="Login Success"
            callback={handlePopupPress}
          />
        )}
        {loginFail && (
          <PopupModal
            title="Fail"
            detail="Login Fail"
            callback={handlePopupPress}
          />
        )}
        {!!sdkError && (
          <PopupModal
            title="Error occur"
            detail="Please try again later"
            callback={handlePopupPress}
          />
        )}
        {unbindSuccess && (
          <PopupModal
            title="Success"
            detail="Unbind Success"
            callback={() => setUnbindSuccess(false)}
          />
        )}
        {!!clientError && (
          <PopupModal
            title="Error"
            detail={clientError}
            callback={() => setClientError('')}
          />
        )}
      </ScreenContainer>
    </ScrollContainer>
  );
};

export default BindEmailScreen;
