import React, {useState, useEffect, useReducer, useContext} from 'react';
import {ScrollView} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useMutation, useQuery} from '@apollo/react-hooks';

import {AuthContext} from '@/context/auth';
import ModalContainer from '@/components/ModalContainer';
import SpecialListOption from '@/components/SpecialListOption';
import ThemeButton from '@/components/ThemeButton';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import useSetupFlow from '@/hooks/useSetupFlow';
import {
  GET_USER_EMAIL_ACCOUNTS_API,
  UNBIND_EMAIL_ACCOUNTS_API,
} from '@/api/data';
import PlusIcon from '@/assets/icon_plus.svg';

import {
  Container,
  MarginTop,
  EmailText,
  UnbindButton,
  UnbindText,
  HeaderContainer,
  HeaderText,
  DetailText,
  NoEmailText,
  NoEmailContainer,
  Image,
  ButtonText,
  ButtonContainer,
} from './style';

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
  const [state, dispatch] = useReducer(reducer, initialState);
  const [emails, setEmails] = useState([{id: null, emailAddress: ''}]);
  const {authToken} = useContext(AuthContext);
  const {navigateByFlow, goBackTo} = useSetupFlow();
  const apiContext = {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
  };
  const {data, loading, refetch} = useQuery(
    GET_USER_EMAIL_ACCOUNTS_API,
    apiContext,
  );
  const [unbindEmailRequest, {loading: unbindEmailLoading}] = useMutation(
    UNBIND_EMAIL_ACCOUNTS_API,
    apiContext,
  );

  useEffect(() => {
    if (data) {
      const emailAccounts = [...(data?.userProfile.emailAccounts || [])];
      setEmails(emailAccounts);
    }
  }, [data]);

  useEffect(() => {
    if (route.params.loginSuccess) {
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
      <ModalContainer
        title={
          <FormattedMessage id="linked_emails" defaultMessage="linked emails" />
        }>
        <Container>
          <DetailText>
            <FormattedMessage id="linked_emails_detail" />
          </DetailText>
          <HeaderContainer>
            <HeaderText>
              <FormattedMessage id="email" defaultMessage="email" />
            </HeaderText>
          </HeaderContainer>
          {emails.length > 0 ? (
            emails.map((email, index) => (
              <>
                <SpecialListOption
                  key={email.emailAddress}
                  label={<EmailText>{email.emailAddress}</EmailText>}
                  value={
                    <UnbindButton onPress={() => handleUnbindPress(email)}>
                      <UnbindText>
                        <FormattedMessage id="remove" defaultMessage="remove" />
                      </UnbindText>
                    </UnbindButton>
                  }
                />
                <MarginTop />
              </>
            ))
          ) : (
            <NoEmailContainer>
              <Image source={require('@/assets/no_email_added.png')} />
              <NoEmailText>No email added</NoEmailText>
            </NoEmailContainer>
          )}
          {/* TODO: align layout between email and card <ButtonContainer
            onPress={() =>
              navigation.navigate('add_email', {navigateFromEdit: true})
            }>
            <PlusIcon />
            <ButtonText>
              <FormattedMessage
                id="add_email_account"
                defaultMessage="ADD EMAIL"
              />
            </ButtonText>
          </ButtonContainer> */}
          <MarginTop value={80} />
          <ThemeButton onPress={handleFinishPress}>
            <FormattedMessage id="finish" defaultMessage="finish" />
          </ThemeButton>
          <MarginTop value={16} />
          <ThemeButton reverse small onPress={handleOtherLinkMethodPress}>
            <FormattedMessage id="connect_more" defaultMessage="Connect more" />
          </ThemeButton>
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
