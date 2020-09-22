import React, {useReducer, useEffect, useCallback} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';

import PinForm from '@/components/PinForm';
import ModalContainer from '@/components/ModalContainer';
import {CHANGE_PIN_API} from '@/api/auth';
import useMutationWithReset from '@/hooks/useMutationWithReset';

const NEXT_STEP = 'nextStep';
const PREVIOUS_STEP = 'previousStep';
const RESET = 'reset';
const SAVE_OLD_PIN = 'saveOldPin';
const SAVE_NEW_PIN = 'saveNewPin';
const SAVE_NEW_CONFIRMED_PIN = 'saveNewConfirmedPin';

const initialState = {
  step: 1,
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
  const intl = useIntl();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [changePinRequest, {error}, reset] = useMutationWithReset(
    CHANGE_PIN_API,
    {},
    {withAuth: true},
  );

  useEffect(() => {
    if (state.oldPin && state.newPin && state.newConfirmedPin) {
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

  const handleOldPinOnFulfill = pin => {
    dispatch({type: SAVE_OLD_PIN, payload: pin});
    dispatch({type: NEXT_STEP});
  };

  const handleNewPinOnFulfill = pin => {
    dispatch({type: SAVE_NEW_PIN, payload: pin});
    dispatch({type: NEXT_STEP});
  };

  const handleVerifyPinOnFinish = async pin => {
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
          pin_action: intl.formatMessage(
            {
              id: 'pin_successfully_with_action',
              defaultMessage: intl.messages.pin_successfully_with_action,
            },
            {
              action: intl.formatMessage({
                id: 'pin_action_changed',
                defaultMessage: intl.messages.pin_action_changed,
              }),
            },
          ),
        });
      }
    } catch (e) {}
  }, [
    changePinRequest,
    intl,
    navigation,
    state.newConfirmedPin,
    state.newPin,
    state.oldPin,
  ]);

  const steps = [
    {
      hints: (
        <FormattedMessage
          id="enter_old_pin"
          defaultMessage="Enter the old PIN"
        />
      ),
      onFulfill: handleOldPinOnFulfill,
    },
    {
      hints: (
        <FormattedMessage
          id="enter_new_pin"
          defaultMessage="Enter the new PIN"
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
          id="error.pin_verification_fail"
          defaultMessage="Verification failed. Please enter a new pin again."
        />
      ),
    },
  ];

  const currentStep = steps[state.step - 1];

  return (
    <ModalContainer
      title={<FormattedMessage id="change_pin" defaultMessage="Change Pin" />}>
      <PinForm
        hints={currentStep.hints}
        onFulfill={currentStep.onFulfill}
        error={currentStep.error}
        key={state.step}
      />
    </ModalContainer>
  );
};

export default ChangePinScreen;
