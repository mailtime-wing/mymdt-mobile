import React, {useReducer, useEffect, useContext, useCallback} from 'react';
import {FormattedMessage} from 'react-intl';
import {AuthContext} from '@/context/auth';

import PinForm from '@/components/PinForm';
import ModalContaienr from '@/components/ModalContainer';
import {CHANGE_PIN_API} from '@/api/auth';
import useMutationWithReset from '@/hooks/useMutationWithReset';

import {Container} from './style';

const NEXT_STEP = 'nextStep';
const PREVIOUS_STEP = 'previousStep';
const RESET = 'reset';
const SAVE_OLD_PIN = 'saveOldPin';
const SAVE_NEW_PIN = 'saveNewPin';
const SAVE_NEW_CONFIRMED_PIN = 'saveNewConfirmedPin';

const initialState = {
  step: 0,
  oldPin: '',
  newPin: '',
  newConfirmedPin: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case NEXT_STEP: {
      return {
        ...state,
        step: state.step + 1,
      };
    }
    case PREVIOUS_STEP: {
      return {
        ...state,
        step: state.step - 1,
      };
    }
    case RESET: {
      return initialState;
    }
    case SAVE_OLD_PIN: {
      return {
        ...state,
        oldPin: action.payload,
      };
    }
    case SAVE_NEW_PIN: {
      return {
        ...state,
        newPin: action.payload,
      };
    }
    case SAVE_NEW_CONFIRMED_PIN: {
      return {
        ...state,
        newConfirmedPin: action.payload,
      };
    }
    default:
      throw new Error();
  }
};

const ChangePinScreen = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {authToken} = useContext(AuthContext);
  const [
    changePinRequest,
    {error: changePinRequestError},
    changePinRequestReset,
  ] = useMutationWithReset(CHANGE_PIN_API, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
  });

  useEffect(() => {
    if (state.oldPin && state.newPin && state.newConfirmedPin) {
      handleSubmit();
    }
  }, [handleSubmit, state]);

  useEffect(() => {
    if (changePinRequestError) {
      setTimeout(() => {
        dispatch({type: RESET});
        changePinRequestReset();
      }, 2000);
    }
  }, [changePinRequestError, changePinRequestReset]);

  const handleOldPinOnFulfill = pin => {
    dispatch({type: SAVE_OLD_PIN, payload: pin});
    dispatch({type: NEXT_STEP});
  };

  const handleNewPinOnFulfill = pin => {
    dispatch({type: SAVE_NEW_PIN, payload: pin});
    dispatch({type: NEXT_STEP});
  };

  const handleVerifyePinOnFinish = async pin => {
    dispatch({type: SAVE_NEW_CONFIRMED_PIN, payload: pin});
  };

  const handleSubmit = useCallback(async () => {
    try {
      const {data} = await changePinRequest({
        variables: {
          oldPin: state.oldPin,
          newPin: state.newPin,
          newConfirmedPin: state.newConfirmedPin,
        },
      });

      if (data) {
        navigation.navigate('pin_success', {
          detail: (
            <FormattedMessage
              id="pin_successfully_with_action"
              defaultMessage="You have successfully {action} your pin."
              values={{
                action: 'changed',
              }}
            />
          ),
        });
      }
    } catch (e) {}
  }, [
    changePinRequest,
    navigation,
    state.newConfirmedPin,
    state.newPin,
    state.oldPin,
  ]);

  const RenderStep = () => {
    switch (state.step) {
      case 0:
        return (
          <PinForm
            hints={
              <FormattedMessage
                id="enter_old_pin"
                defaultMessage="Enter the old PIN"
              />
            }
            onFulfill={handleOldPinOnFulfill}
          />
        );
      case 1:
        return (
          <PinForm
            hints={
              <FormattedMessage
                id="enter_new_pin"
                defaultMessage="Enter the new PIN"
              />
            }
            onFulfill={handleNewPinOnFulfill}
          />
        );
      case 2:
        return (
          <PinForm
            hints={
              <FormattedMessage
                id="enter_pin_to_verify"
                defaultMessage="Enter the pin again to verify"
              />
            }
            onFulfill={handleVerifyePinOnFinish}
            error={
              changePinRequestError && (
                <FormattedMessage
                  id="pin_verification_fail"
                  defaultMessage="Verification failed. Please enter a new pin again."
                />
              )
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <ModalContaienr
      title={<FormattedMessage id="change_pin" defaultMessage="Change Pin" />}>
      <Container>
        <RenderStep />
      </Container>
    </ModalContaienr>
  );
};

export default ChangePinScreen;
