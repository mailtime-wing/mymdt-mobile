import React, {useLayoutEffect, useReducer} from 'react';
import {TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';
import {Formik} from 'formik';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {UPDATE_USER_PROFILE_EDIT_API, GET_USER_PROFILE_API} from '@/api/data';

import {genderOptions} from '@/components/GenderSelector';

import BackIconButton from '@/components/BackIconButton';
import CloseIconButton from '@/components/CloseIconButton';
import EditAppButton from '@/components/EditAppButton';
import ConfirmAppButton from '@/components/ConfirmAppButton';
import CancelAppButton from '@/components/CancelAppButton';
import UserProfileEditForm from './UserProfileEditForm';

const RESET_FORM = 'resetForm';
const UPDATE_IS_CANCELLED = 'updateIsCancelled';
const UPDATE_IS_CONFIRMED = 'updateIsConfirmed';
const UPDATE_IS_EDITING = 'updateIsEditing';
const UPDATE_IS_VALUE_CHANGED = 'updateIsValueChanged';
const UPDATE_SHOW_DATE_PICKER = 'updateShowDatePicker';

const initialState = {
  isCancelled: false,
  isEditing: false,
  isConfirmed: false,
  isValuesChanged: false,
  showDatePicker: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case RESET_FORM: {
      return initialState;
    }
    case UPDATE_IS_CANCELLED: {
      return {
        ...state,
        isCancelled: true,
        isEditing: false,
        isConfirmed: false,
        isValuesChanged: false,
        showDatePicker: false,
      };
    }
    case UPDATE_IS_CONFIRMED: {
      return {
        ...state,
        isCancelled: false,
        isEditing: false,
        isConfirmed: true,
        isValuesChanged: false,
        showDatePicker: false,
      };
    }
    case UPDATE_IS_EDITING: {
      return {
        ...state,
        isEditing: true,
        isCancelled: false,
        isConfirmed: false,
      };
    }
    case UPDATE_IS_VALUE_CHANGED: {
      return {
        ...state,
        isValuesChanged: true,
      };
    }
    case UPDATE_SHOW_DATE_PICKER: {
      return {
        ...state,
        showDatePicker: action.payload,
      };
    }
    default:
      break;
  }
};

const UserProfileEditScreen = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [updateUserProfileRequest] = useMutationWithAuth(
    UPDATE_USER_PROFILE_EDIT_API,
  );
  const {data, refetch} = useQueryWithAuth(GET_USER_PROFILE_API, {
    fetchPolicy: 'network-only',
  });

  const handleDatePickerPress = () => {
    dispatch({type: UPDATE_SHOW_DATE_PICKER, payload: !state.showDatePicker});
  };

  const handleSpacePress = () => {
    dispatch({type: UPDATE_SHOW_DATE_PICKER, payload: false});
    Keyboard.dismiss();
  };

  const handleEditPress = () => {
    dispatch({type: UPDATE_IS_EDITING});
  };

  const handleConfirmPress = () => {
    dispatch({type: UPDATE_IS_CONFIRMED});
  };

  const handleCancelPress = () => {
    Keyboard.dismiss();
    dispatch({type: UPDATE_IS_CANCELLED});
  };

  const handleSubmitPress = async (values) => {
    try {
      await updateUserProfileRequest({
        variables: {
          name: values.name,
          gender: values.gender,
          dateOfBirth: values.dob,
        },
      });
    } catch (e) {
      console.error('Error in updating user profile edit screen', e);
    }
    dispatch({type: RESET_FORM});
    Keyboard.dismiss();
    refetch();
  };

  const initialValues = {
    name: data?.userProfile?.name,
    gender: genderOptions.find(
      (gender) => gender.value === data?.userProfile?.gender,
    )?.value,
    dob: data?.userProfile?.birthday,
    phone: data?.userProfile?.phoneNumber,
  };

  const validate = (values) => {
    dispatch({type: UPDATE_IS_VALUE_CHANGED});
    const errors = {};

    if (!values.name) {
      errors.name = 'Name Required';
    }
    if (!values.gender) {
      errors.gender = 'Gender Required';
    }
    return errors;
  };

  useLayoutEffect(() => {
    if (state.isEditing) {
      navigation.setOptions({
        headerLeft: () => <CancelAppButton onPress={handleCancelPress} />,
        headerRight: () => (
          <ConfirmAppButton
            onPress={handleConfirmPress}
            disabled={!state.isValuesChanged}
          />
        ),
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
  }, [navigation, state]);

  return (
    <TouchableWithoutFeedback onPress={handleSpacePress}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={(values) => handleSubmitPress(values)}
          validate={(values) => validate(values)}>
          <UserProfileEditForm
            handleDatePickerPress={handleDatePickerPress}
            formState={state}
          />
        </Formik>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default UserProfileEditScreen;
