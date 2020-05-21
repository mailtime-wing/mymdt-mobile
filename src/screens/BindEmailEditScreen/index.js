import React, {useState, useLayoutEffect, useReducer} from 'react';
import {FormattedMessage} from 'react-intl';
import {
  Container,
  ButtonContainer,
  EmailText,
  UnbindButton,
  UnbindText,
  TitleContainer,
  TitleText
} from './style';

import ModalContainer from '@/components/ModalContainer';
import SpecialListOption from '@/components/SpecialListOption';
import ThemeButton from '@/components/ThemeButton';
import Switch from '@/components/Switch';
import EditButton from '@/components/EditButton';
import CancelButton from '@/components/CancelButton';
import ConfirmButton from '@/components/ConfirmButton';
import HeaderButton from '@/components/HeaderButton';
import PopupModal from '@/components/PopupModal';

const emailsSampleData = [
  {email: 'foo@gmail.com', share: true},
  {email: 'bar@gmail.com', share: false},
  {email: 'foo.bar@mailtime.com', share: false},
];

const UPDATE_IS_EDITING = 'updateIsEditing';
const UPDATE_IS_CONFIRMED = 'updateIsConfirmed';
const UPDATE_IS_CANCELLED = 'updateIsCancelled';
const UPDATE_IS_EMAIL_UNBINDING = 'updateIsEmailUnbinding';
const UPDATE_IS_EMAIL_UNBIND_CANCELLED = 'updateIsEmailUnbindCancelled';
const UPDATE_IS_EMAIL_UNBIND_CONFIRMED = 'updateIsEmailUnbindConfirmed';

const initialState = {
  isEditing: false,
  isUnbinding: false,
  isConfirmed: false,
  unbindingEmail: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_IS_CANCELLED: {
      return initialState
    }
    case UPDATE_IS_EDITING: {
      return {
        ...state,
        isEditing: true
      }
    }
    case UPDATE_IS_CONFIRMED: {
      return {
        ...state,
        // no action this moment
      }
    }
    case UPDATE_IS_EMAIL_UNBINDING: {
      return {
        ...state,
        isUnbinding: true,
        isConfirmed: false,
        unbindingEmail: action.payload
      }
    }
    case UPDATE_IS_EMAIL_UNBIND_CANCELLED: {
      return {
        ...state,
        isUnbinding: false,
        unbindingEmail: ''
      }
    }
    case UPDATE_IS_EMAIL_UNBIND_CONFIRMED: {
      return {
        ...state,
        isEditing: false,
        isUnbinding: false,
        unbindingEmail: '',
      }
    }
    default:
      throw new Error();
  }
}

const BindEmailEditScreen = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [emails, setEmails] = useState(
    emailsSampleData.map(email => email.share),
  );

  console.log(state)

  useLayoutEffect(() => {
    if (state.isEditing) {
      navigation.setOptions({
        headerLeft: () => (
          <CancelButton onPress={handleCancelPress} />
        ),
        headerRight: () => <ConfirmButton onPress={handleConfirmPress} />,
      });
    } else {
      navigation.setOptions({
        headerLeft: () => <HeaderButton isModal root="menu" />,
        headerRight: () => <EditButton onPress={handleEditPress} />,
      });
    }
  }, [state.isEditing, navigation]);

  const handleEditPress = () => {
    dispatch({ type: UPDATE_IS_EDITING })
  };

  const handleCancelPress = () => {
    dispatch({ type: UPDATE_IS_CANCELLED })
  }

  const handleConfirmPress = () => {
    // no action this moment
  };

  const handleUnbindPress = email => {
    dispatch({ type: UPDATE_IS_EMAIL_UNBINDING, payload: email })
  };

  const handleCallback = result => {
    if (result === 'OK') {
      dispatch({ type: UPDATE_IS_EMAIL_UNBIND_CONFIRMED })
      return
    }
    dispatch({ type: UPDATE_IS_EMAIL_UNBIND_CANCELLED })
  };

  const handleInputChange = index => {
    const data = [...emails];
    data[index] = !data[index];
    setEmails(data);
  };

  return (
    <ModalContaienr title={<FormattedMessage id="emails_manage" />}>
      <TitleContainer>
        <TitleText>
          <FormattedMessage id="email" defaultMessage="email" />
        </TitleText>
        {!state.isEditing && 
          <TitleText>
            <FormattedMessage id="data_sharing" defaultMessage="data sharing" />
          </TitleText>
        }
      </TitleContainer>
      <Container>
        {emails.map((email, index) => (
          <SpecialListOption
            key={email.emailAddress}
            label={<EmailText>{email.emailAddress}</EmailText>}
            value={
              state.isEditing ? (
                <UnbindButton onPress={() => handleUnbindPress(email.email)}>
                  <UnbindText><FormattedMessage id="unbind" defaultMessage="unbind" /></UnbindText>
                </UnbindButton>
              ) : (
                <Switch
                  value={emails[index]}
                  onChange={() => handleInputChange(index)}
                />
              )
            }
          />
        ))}
      </Container>
      {state.isEditing && <ButtonContainer>
        <ThemeButton onPress={() => navigation.navigate('emails_binding', {navigateFromEdit: true})} small width="auto">
          <FormattedMessage id="add_email_account" defaultMessage="ADD EMAIL" />
        </ThemeButton>
      </ButtonContainer>}
      {state.isUnbinding && (
        <PopupModal
          title="Unbind this email"
          detail={`You will not get any data rewards from ${state.unbindingEmail} after unbinding.`}
          callback={handleCallback}
        />
      )}
    </ModalContaienr>
  );
};

export default BindEmailEditScreen;
