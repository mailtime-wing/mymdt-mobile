import React, {useState, useEffect, useReducer} from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import ModalContainer from '@/components/ModalContainer';
import SpecialListOption from '@/components/SpecialListOption';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import useSetupFlow from '@/hooks/useSetupFlow';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {
  GET_USER_EMAIL_ACCOUNTS_API,
  UNBIND_EMAIL_ACCOUNTS_API,
} from '@/api/data';

import {
  Container,
  MarginTop,
  HeaderContainer,
  NoEmailContainer,
  Image,
  unbindButtonContainer,
  emailStyle,
  detailStyle,
  noEmailStyle,
  headerStyle,
  title,
} from './style';
import {useTheme} from 'emotion-theming';

// const RESET = 'reset';
// const UPDATE_IS_EDITING = 'updateIsEditing';
// const UPDATE_IS_CONFIRMED = 'updateIsConfirmed';
const UPDATE_IS_EMAIL_UNBINDING = 'updateIsEmailUnbinding';
const UPDATE_IS_EMAIL_UNBIND_CANCELLED = 'updateIsEmailUnbindCancelled';
const UPDATE_IS_EMAIL_UNBIND_CONFIRMED = 'updateIsEmailUnbindConfirmed';

const initialState = {
  // isEditing: false,
  isUnbinding: false,
  // isConfirmed: false,
  unbindingEmail: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    // case RESET: {
    //   return initialState;
    // }
    // case UPDATE_IS_EDITING: {
    //   return {
    //     ...state,
    //     isEditing: true,
    //   };
    // }
    // case UPDATE_IS_CONFIRMED: {
    //   return {
    //     ...state,
    //     // no action this moment
    //   };
    // }
    case UPDATE_IS_EMAIL_UNBINDING: {
      return {
        ...state,
        isUnbinding: true,
        isConfirmed: false,
        unbindingEmail: action.payload,
      };
    }
    case UPDATE_IS_EMAIL_UNBIND_CANCELLED: {
      return {
        ...state,
        isUnbinding: false,
        unbindingEmail: {},
      };
    }
    case UPDATE_IS_EMAIL_UNBIND_CONFIRMED: {
      return {
        ...state,
        isEditing: false,
        isUnbinding: false,
        unbindingEmail: {},
      };
    }
    default:
      throw new Error();
  }
};

const LinkedEmailsScreen = ({navigation, route}) => {
  const theme = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [emails, setEmails] = useState([{id: null, emailAddress: ''}]);
  const {navigateByFlow, goBackTo} = useSetupFlow();
  const {data, loading, refetch} = useQueryWithAuth(
    GET_USER_EMAIL_ACCOUNTS_API,
  );
  const [
    unbindEmailRequest,
    {loading: unbindEmailLoading},
  ] = useMutationWithAuth(UNBIND_EMAIL_ACCOUNTS_API);

  useEffect(() => {
    if (data) {
      const emailAccounts = [...(data?.userProfile.emailAccounts || [])];
      setEmails(emailAccounts);
    }
  }, [data]);

  useEffect(() => {
    if (route?.params?.loginSuccess) {
      refetch();
    }
  }, [refetch, route]);

  const handleUnbindPress = email => {
    dispatch({type: UPDATE_IS_EMAIL_UNBINDING, payload: email});
  };

  const handleCallback = result => {
    if (result === 'OK') {
      handleUnbindEmailConfirmPress();
      return;
    }
    dispatch({type: UPDATE_IS_EMAIL_UNBIND_CANCELLED});
  };

  const handleUnbindEmailConfirmPress = async () => {
    try {
      await unbindEmailRequest({
        variables: {
          ids: [state.unbindingEmail?.id],
        },
      });
      dispatch({type: UPDATE_IS_EMAIL_UNBIND_CANCELLED}); // = reset
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFinishPress = () => {
    navigateByFlow();
  };

  const handleOtherLinkMethodPress = () => {
    goBackTo('introduction');
  };

  if (loading || unbindEmailLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView>
      <ModalContainer>
        <AppText variant="pageTitle" style={title(theme)}>
          <FormattedMessage id="linked_emails" defaultMessage="linked emails" />
        </AppText>
        <Container>
          <AppText variant="body1" style={detailStyle(theme)}>
            <FormattedMessage id="linked_emails_detail" />
          </AppText>
          <HeaderContainer>
            <AppText variant="label" style={headerStyle(theme)}>
              <FormattedMessage id="email" defaultMessage="email" />
            </AppText>
          </HeaderContainer>
          {emails.length > 0 ? (
            emails.map((email, index) => (
              <>
                <SpecialListOption
                  key={email.emailAddress}
                  label={
                    <AppText variant="body1" style={emailStyle(theme)}>
                      {email.emailAddress}
                    </AppText>
                  }
                  value={
                    <AppButton
                      style={unbindButtonContainer}
                      onPress={() => handleUnbindPress(email)}
                      text={
                        <FormattedMessage
                          id="button.remove"
                          defaultMessage="remove"
                        />
                      }
                      variant="outlined"
                      sizeVariant="compact"
                      colorVariant="alert"
                    />
                  }
                />
                <MarginTop />
              </>
            ))
          ) : (
            <NoEmailContainer>
              <Image source={require('@/assets/no_email_added.png')} />
              <AppText variant="heading3" style={noEmailStyle(theme)}>
                No email added
              </AppText>
            </NoEmailContainer>
          )}
          <MarginTop value={80} />
          <AppButton
            onPress={handleFinishPress}
            text={
              <FormattedMessage id="button.finish" defaultMessage="finish" />
            }
            variant="filled"
            sizeVariant="large"
            colorVariant="secondary"
          />
          <MarginTop value={16} />
          <AppButton
            onPress={handleOtherLinkMethodPress}
            text={
              <FormattedMessage
                id="button.connect_more"
                defaultMessage="Connect more"
              />
            }
            variant="outlined"
            sizeVariant="normal"
            colorVariant="secondary"
          />
        </Container>

        {state.isUnbinding && (
          <PopupModal
            title="Remove this email"
            detail={`You will not get any data rewards from ${
              state.unbindingEmail?.emailAddress
            } after unbinding.`}
            callback={handleCallback}
          />
        )}
      </ModalContainer>
    </ScrollView>
  );
};

export default LinkedEmailsScreen;
