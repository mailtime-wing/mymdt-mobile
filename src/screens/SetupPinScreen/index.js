import React, {useReducer, useEffect, useContext, useCallback} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {AuthContext} from '@/context/auth';

import PinForm from '@/components/PinForm';
import ModalContainer from '@/components/ModalContainer';
import {SETUP_PIN_API} from '@/api/auth';
import useMutationWithReset from '@/hooks/useMutationWithReset';

const NEXT_STEP = 'nextStep';
const PREVIOUS_STEP = 'previousStep';
const RESET = 'reset';
const SAVE_NEW_PIN = 'saveNewPin';
const SAVE_NEW_CONFIRMED_PIN = 'saveNewConfirmedPin';

const initialState = {
  step: 1,
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

const SetupPinScreen = ({navigation}) => {
  const intl = useIntl();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {authToken} = useContext(AuthContext);
  const [setupPinRequest, {error}, reset] = useMutationWithReset(
    SETUP_PIN_API,
    {
      context: {
        headers: {
          authorization: authToken ? `Bearer ${authToken}` : '',
        },
      },
    },
  );

  useEffect(() => {
    if (state.newPin && state.newConfirmedPin) {
      handleSubmit();
    }
  }, [handleSubmit, state]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch({type: RESET});
        reset();
      }, 2000);
    }
  }, [error, reset]);

  const handleNewPinOnFulfill = pin => {
    dispatch({type: SAVE_NEW_PIN, payload: pin});
    dispatch({type: NEXT_STEP});
  };

  const handleVerifyPinOnFinish = async pin => {
    dispatch({type: SAVE_NEW_CONFIRMED_PIN, payload: pin});
  };

  const handleSubmit = useCallback(async () => {
    try {
      const {data} = await setupPinRequest({
        variables: {
          pin: state.newPin,
          confirmedPin: state.newConfirmedPin,
        },
      });

      if (data) {
        navigation.navigate('pin_success', {
          pin_action: intl.formatMessage(
            {
              id: 'pin_successfully_with_action',
              defaultMessage: intl.messages.pin_successfully_with_action,
            },
            {
              action: intl.formatMessage({
                id: 'pin_action_setup',
                defaultMessage: intl.messages.pin_action_setup,
              }),
            },
          ),
        });
      }
    } catch (e) {}
  }, [intl, navigation, setupPinRequest, state.newConfirmedPin, state.newPin]);

  const steps = [
    {
      hints: (
        <FormattedMessage
          id="enter_6_digit_pin"
          defaultMessage="Enter 6-digit PIN"
        />
      ),
      onFulfill: handleNewPinOnFulfill,
    },
    {
      hints: (
        <FormattedMessage
          id="enter_pin_to_verify"
          defaultMessage="Enter the pin again to verify"
        />
      ),
      onFulfill: handleVerifyPinOnFinish,
      error: error && (
        <FormattedMessage
          id="pin_verification_fail"
          defaultMessage="Verification failed. Please enter a new pin again."
        />
      ),
    },
  ];

  const currentStep = steps[state.step - 1];

  return (
    <ModalContainer
      title={<FormattedMessage id="set_up_pin" defaultMessage="Set Up Pin" />}>
      <PinForm
        hints={currentStep.hints}
        onFulfill={currentStep.onFulfill}
        error={currentStep.error}
        key={state.step}
      />
    </ModalContainer>
  );
};

export default SetupPinScreen;
