import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useReducer,
  useContext,
} from 'react';
import {FormattedMessage} from 'react-intl';
import {AuthContext} from '@/context/auth';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {
  GET_USER_EMAIL_ACCOUNTS_API,
  UNBIND_EMAIL_ACCOUNTS_API,
} from '@/api/data';

import {
  Container,
  ButtonContainer,
  EmailText,
  UnbindButton,
  UnbindText,
  TitleContainer,
  TitleText,
} from './style';

import ModalContainer from '@/components/ModalContainer';
import SpecialListOption from '@/components/SpecialListOption';
import ThemeButton from '@/components/ThemeButton';
import Switch from '@/components/Switch';
import EditButton from '@/components/EditButton';
import CancelButton from '@/components/CancelButton';
import ConfirmButton from '@/components/ConfirmButton';
import CloseButton from '@/components/CloseButton';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';

const RESET = 'reset';
const UPDATE_IS_EDITING = 'updateIsEditing';
const UPDATE_IS_CONFIRMED = 'updateIsConfirmed';
const UPDATE_IS_EMAIL_UNBINDING = 'updateIsEmailUnbinding';
const UPDATE_IS_EMAIL_UNBIND_CANCELLED = 'updateIsEmailUnbindCancelled';
const UPDATE_IS_EMAIL_UNBIND_CONFIRMED = 'updateIsEmailUnbindConfirmed';

const initialState = {
  isEditing: false,
  isUnbinding: false,
  isConfirmed: false,
  unbindingEmail: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case RESET: {
      return initialState;
    }
    case UPDATE_IS_EDITING: {
      return {
        ...state,
        isEditing: true,
      };
    }
    case UPDATE_IS_CONFIRMED: {
      return {
        ...state,
        // no action this moment
      };
    }
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

const BindEmailEditScreen = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [emails, setEmails] = useState([{id: null, emailAddress: ''}]);
  const {authToken} = useContext(AuthContext);
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
    dispatch({type: RESET});
    if (data) {
      let emailAccounts = data?.userProfile.emailAccounts || [];
      emailAccounts = emailAccounts.map(email => ({...email, sharing: false})); // sharing data api later
      setEmails(emailAccounts);
    }
  }, [data]);

  useLayoutEffect(() => {
    if (state.isEditing) {
      navigation.setOptions({
        headerLeft: () => <CancelButton onPress={handleCancelPress} />,
        headerRight: () => <ConfirmButton onPress={handleConfirmPress} />,
      });
    } else {
      navigation.setOptions({
        headerLeft: props => <CloseButton {...props} />,
        headerRight: () => <EditButton onPress={handleEditPress} />,
      });
    }
  }, [state.isEditing, navigation]);

  const handleEditPress = () => {
    dispatch({type: UPDATE_IS_EDITING});
  };

  const handleCancelPress = () => {
    dispatch({type: RESET});
  };

  const handleConfirmPress = () => {
    // no action this moment
  };

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

  const handleInputChange = index => {
    const newEmails = [...emails];
    newEmails[index].sharing = !newEmails[index].sharing;
    setEmails(newEmails);
  };

  if (loading || unbindEmailLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ModalContainer title={<FormattedMessage id="linked_emails" />}>
      <TitleContainer>
        <TitleText>
          <FormattedMessage id="email" defaultMessage="email" />
        </TitleText>
        {!state.isEditing && (
          <TitleText>
            <FormattedMessage id="data_sharing" defaultMessage="data sharing" />
          </TitleText>
        )}
      </TitleContainer>
      <Container>
        {emails.map((email, index) => (
          <SpecialListOption
            key={email.emailAddress}
            label={<EmailText>{email.emailAddress}</EmailText>}
            value={
              state.isEditing ? (
                <UnbindButton onPress={() => handleUnbindPress(email)}>
                  <UnbindText>
                    <FormattedMessage id="unbind" defaultMessage="unbind" />
                  </UnbindText>
                </UnbindButton>
              ) : (
                <Switch
                  value={email.sharing}
                  onChange={() => handleInputChange(index)}
                />
              )
            }
          />
        ))}
      </Container>
      {state.isEditing && (
        <ButtonContainer>
          <ThemeButton
            onPress={() =>
              navigation.navigate('emails_binding', {navigateFromEdit: true})
            }
            medium
            width="auto">
            <FormattedMessage
              id="add_email_account"
              defaultMessage="ADD EMAIL"
            />
          </ThemeButton>
        </ButtonContainer>
      )}
      {state.isUnbinding && (
        <PopupModal
          title="Unbind this email"
          detail={`You will not get any data rewards from ${
            state.unbindingEmail?.emailAddress
          } after unbinding.`}
          callback={handleCallback}
        />
      )}
    </ModalContainer>
  );
};

export default BindEmailEditScreen;
