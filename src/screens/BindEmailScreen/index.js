import React, {useState, useContext, useEffect} from 'react';
import {FormattedMessage} from 'react-intl';
import {AuthContext} from '@/context/auth';
import {useMutation, useQuery} from '@apollo/react-hooks';

import {
  GET_USER_EMAIL_ACCOUNTS_API,
  UNBIND_EMAIL_ACCOUNTS_API,
} from '@/api/data';

import {
  EmailContainer,
  EmailRowContainer,
  Title,
  Detail,
  BindMoreLaterText,
  MarginContainer,
  ScrollContainer,
} from './style';

import Input from '@/components/Input';
import ThemeButton from '@/components/ThemeButton';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import ScreenContainer from '@/components/ScreenContainer';

import useMailTimeSdk from '@/hooks/useMailTimeSdk';

const BindEmailScreen = ({route, navigation}) => {
  const [unbindSuccess, setUnbindSuccess] = useState(false);
  const [clientError, setClientError] = useState('');
  const {
    login,
    reset,
    loading: sdkLoading,
    error: sdkError,
    loginSuccess,
    loginFail,
    loginCancel,
  } = useMailTimeSdk();

  const {authToken} = useContext(AuthContext);
  const apiContext = {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
  };
  const userEmailAccountsData = useQuery(
    GET_USER_EMAIL_ACCOUNTS_API,
    apiContext,
  );
  const [unbindEmailRequest, {loading}] = useMutation(
    UNBIND_EMAIL_ACCOUNTS_API,
    apiContext,
  );

  const currentIndex =
    userEmailAccountsData?.data?.userProfile?.emailAccounts?.length || 0;

  const [emails, setEmails] = useState([{id: null, emailAddress: ''}]);
  useEffect(() => {
    if (userEmailAccountsData?.data) {
      const emailAccounts = [
        ...(userEmailAccountsData?.data?.userProfile.emailAccounts || []),
        {id: null, emailAddress: ''},
      ];
      setEmails(emailAccounts);
    }
  }, [userEmailAccountsData]);

  const handleUnbindEmailPress = async unbindEmailId => {
    try {
      await unbindEmailRequest({
        variables: {
          ids: [unbindEmailId],
        },
      });
      setUnbindSuccess(true);
      userEmailAccountsData?.refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const handleBindEmailPress = email => {
    const regex = /[^@]+@[^\.]+\..+/;
    if (!regex.test(email)) {
      setClientError('Please input valid email');
      return;
    }
    login(email);
  };

  const handleEmailOnChange = (email, index) => {
    setEmails(existingEmails => {
      const newEmails = [...existingEmails];
      newEmails[index].emailAddress = email;
      return newEmails;
    });
  };

  const handleFinishPress = () => {
    navigation.navigate(route.params.skip);
  };

  const handleSkipPress = () => {
    navigation.navigate(route.params.next);
  };

  const handlePopupPress = () => {
    reset();
    userEmailAccountsData?.refetch();
  };

  if (loading || sdkLoading || userEmailAccountsData.loading) {
    return <LoadingSpinner />;
  }

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

        {emails.map((email, index) => {
          const active = index === currentIndex;
          const isBind = index < currentIndex;
          const isNext = !active && !isBind;
          return (
            <EmailRowContainer isNext={isNext}>
              <EmailContainer>
                <Input
                  type="email"
                  onChangeText={text => handleEmailOnChange(text, index)}
                  value={email.emailAddress}
                  editable={active}
                  readOnly={isBind}
                  label={
                    <FormattedMessage
                      id="email_account"
                      defaultMessage="EMAIL {email_count}"
                      values={{
                        email_count: index + 1,
                      }}
                    />
                  }
                />
              </EmailContainer>
              {isBind ? (
                <ThemeButton
                  small
                  disabled={isNext || !email.emailAddress}
                  onPress={() => handleUnbindEmailPress(email.id)}>
                  <FormattedMessage id="unbind" defaultMessage="unbind" />
                </ThemeButton>
              ) : (
                <ThemeButton
                  small
                  disabled={isNext || !email.emailAddress}
                  onPress={() => handleBindEmailPress(email.emailAddress)}>
                  <FormattedMessage id="login" />
                </ThemeButton>
              )}
            </EmailRowContainer>
          );
        })}
        <ThemeButton onPress={handleFinishPress}>
          <FormattedMessage id="finish" defaultMessage="finish" />
        </ThemeButton>
        <MarginContainer />
        <ThemeButton reverse small onPress={handleSkipPress}>
          <FormattedMessage id="skip_for_now" defaultMessage="Skip for now" />
        </ThemeButton>
        <BindMoreLaterText>
          <FormattedMessage
            id="bind_more_email_later"
            defaultMessage="You can bind more emails later in profile."
          />
        </BindMoreLaterText>
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
