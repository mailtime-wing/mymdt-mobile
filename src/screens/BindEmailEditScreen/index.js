import React, {useState, useEffect, useLayoutEffect, useReducer} from 'react';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import {
  GET_USER_EMAIL_ACCOUNTS_API,
  UNBIND_EMAIL_ACCOUNT_API,
} from '@/api/data';

import {
  Container,
  ButtonContainer,
  UnbindButton,
  TitleContainer,
  titleText,
  removeText,
  addEmailButton,
} from './style';

import ModalContainer from '@/components/ModalContainer';
import SpecialListOption from '@/components/SpecialListOption';
import AppButton from '@/components/AppButton';
import BackIconButton from '@/components/BackIconButton';
import CloseIconButton from '@/components/CloseIconButton';
import EditAppButton from '@/components/EditAppButton';
import ConfirmAppButton from '@/components/ConfirmAppButton';
import CancelAppButton from '@/components/CancelAppButton';
import PopupModal from '@/components/PopupModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import AppText from '@/components/AppText2';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';

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
  const theme = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [emails, setEmails] = useState([{id: null, emailAddress: ''}]);
  const {data, loading, refetch} = useQueryWithAuth(
    GET_USER_EMAIL_ACCOUNTS_API,
    {
      fetchPolicy: 'cache-and-network',
    },
  );
  const [
    unbindEmailRequest,
    {loading: unbindEmailLoading},
  ] = useMutationWithAuth(UNBIND_EMAIL_ACCOUNT_API);

  useEffect(() => {
    dispatch({type: RESET});
    if (data) {
      let emailAccounts = data?.userProfile.emailAccounts || [];
      emailAccounts = emailAccounts.map((email) => ({
        ...email,
        sharing: false,
      })); // sharing data api later
      setEmails(emailAccounts);
    }
  }, [data]);

  useLayoutEffect(() => {
    if (state.isEditing) {
      navigation.setOptions({
        headerLeft: () => <CancelAppButton onPress={handleCancelPress} />,
        headerRight: () => <ConfirmAppButton onPress={handleConfirmPress} />,
      });
    } else {
      navigation.setOptions({
        headerLeft: ({onPress}) => {
          return onPress ? (
            <BackIconButton onPress={onPress} />
          ) : (
            <CloseIconButton onPress={() => navigation.goBack()} />
          );
        },
        headerRight: () => <EditAppButton onPress={handleEditPress} />,
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

  const handleUnbindPress = (email) => {
    dispatch({type: UPDATE_IS_EMAIL_UNBINDING, payload: email});
  };

  const handleCallback = (result) => {
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
          id: state.unbindingEmail?.id,
        },
      });
      dispatch({type: UPDATE_IS_EMAIL_UNBIND_CANCELLED}); // = reset
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || unbindEmailLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ModalContainer title={<FormattedMessage id="linked_emails" />}>
      <TitleContainer>
        <AppText variant="label" style={titleText(theme)}>
          <FormattedMessage id="email" defaultMessage="email" />
        </AppText>
      </TitleContainer>
      <Container>
        {emails.map((email) => (
          <SpecialListOption
            key={email.emailAddress}
            label={<AppText variant="body1">{email.emailAddress}</AppText>}
            value={
              state.isEditing && (
                <UnbindButton onPress={() => handleUnbindPress(email)}>
                  <AppText variant="button" style={removeText(theme)}>
                    <FormattedMessage
                      id="button.unbind"
                      defaultMessage="unbind"
                    />
                  </AppText>
                </UnbindButton>
              )
            }
          />
        ))}
      </Container>
      <ButtonContainer>
        <AppButton
          onPress={() =>
            navigation.navigate('email_data_source_info_setting', {
              navigateFromEdit: true,
            })
          }
          text={
            <FormattedMessage
              id="add_email_account"
              defaultMessage="ADD EMAIL"
            />
          }
          variant="filled"
          sizeVariant="normal"
          colorVariant="secondary"
          style={addEmailButton}
        />
      </ButtonContainer>
      {state.isUnbinding && (
        <PopupModal
          title="Unbind this email"
          detail={`You will not get any data rewards from ${state.unbindingEmail?.emailAddress} after unbinding.`}
          callback={handleCallback}
        />
      )}
    </ModalContainer>
  );
};

export default BindEmailEditScreen;
