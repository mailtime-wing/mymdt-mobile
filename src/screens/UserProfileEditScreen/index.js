import React, { useContext, useLayoutEffect, useEffect, useReducer } from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { FormattedMessage, FormattedDate } from 'react-intl';
import ImagePicker from 'react-native-image-picker';
import { Formik, useFormikContext } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER_PROFILE_EDIT_API, GET_USER_PROFILE_API } from '@/api/data';
import { AuthContext } from '@/context/auth';

import {
  FillIcon,
  errorStyle,
  formContainer,
  nameStyle,
  dateFieldContainer,
  profilePictureText,
  profilePictureContainer,
  editingStyle,
  marginTop,
} from './style';

import GenderSelector, { genderOptions } from '@/components/GenderSelector';
import DateTimePickerInput from '@/components/DateTimePickerInput';
import ListOption from '@/components/ListOption';

import ModalContainer from '@/components/ModalContainer';
import EditButton from '@/components/EditButton';
import CancelButton from '@/components/CancelButton';
import ConfirmButton from '@/components/ConfirmButton';
import CloseIconButton from '@/components/CloseIconButton';
import Input from '@/components/AppInput';
import AppAvator from '@/components/AppAvator';
import AppText from '@/components/AppText2';

import splitPhoneNumber from '@/utils/splitPhoneNumber';
import { useTheme } from 'emotion-theming';

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

const cameraOptions = {
  title: 'CHANGE PROFILE PHOTO',
  customButtons: [{ name: 'REMOVE', title: 'Remove Current Photo' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const UserProfileEditForm = ({ handleDatePickerPress, formState }) => {
  const theme = useTheme();
  const {
    setFieldValue,
    values,
    errors,
    submitForm,
    resetForm,
  } = useFormikContext();

  useEffect(() => {
    if (formState.isConfirmed) {
      submitForm();
    }

    if (formState.isCancelled) {
      resetForm();
    }
  }, [formState.isConfirmed, formState.isCancelled, submitForm, resetForm]);

  const handleCameraPress = () => {
    ImagePicker.showImagePicker(cameraOptions, response => {
      if (response.didCancel) {
        // handle cancel
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        setFieldValue('profilePicture', null);
      } else {
        const source = { uri: response.uri };
        if (source) {
          setFieldValue('profilePicture', source);
        }
      }
    });
  };

  return (
    <View
      style={formContainer}
      pointerEvents={formState.isEditing ? 'auto' : 'none'}>
      {formState.isEditing ? (
        <>
          <View style={[profilePictureContainer, editingStyle]}>
            <AppText variant="label" style={profilePictureText(theme)}>
              <FormattedMessage
                id="profile_photo"
                defaultMessage="profile photo"
              />
            </AppText>
            <TouchableOpacity onPress={() => handleCameraPress()}>
              <AppAvator
                variant="image"
                sizeVariant="normal"
                imageSrc={values.profilePicture}
              />
            </TouchableOpacity>
            <FillIcon source={require('@/assets/filled.png')} />
          </View>
          <Input
            label={<FormattedMessage id="your_name" />}
            required
            name="name"
          />
          <GenderSelector
            gender={values.gender}
            setFieldValue={setFieldValue}
          />
          <AppText variant="caption" style={errorStyle(theme)}>
            {errors.gender ? errors.gender : ' '}
          </AppText>
          <TouchableOpacity
            style={dateFieldContainer}
            onPress={handleDatePickerPress}>
            <DateTimePickerInput
              label={
                <FormattedMessage
                  id="date_of_birth"
                  defaultMessage="DATE OF BIRTH"
                />
              }
              required
              name="dob"
              showDatePicker={formState.showDatePicker}
            />
          </TouchableOpacity>
        </>
      ) : (
          <>
            <View style={[profilePictureContainer, marginTop]}>
              <AppAvator
                variant="image"
                sizeVariant="normal"
                imageSrc={values.profilePicture}
              />
              <AppText variant="subTitle1" style={nameStyle(theme)}>
                {values.name}
              </AppText>
            </View>
            <ListOption
              key="gender"
              label={<FormattedMessage id="gender" />}
              value={
                genderOptions.find(gender => gender.value === values.gender)
                  ?.label
              }
              noArrow
            />
            <ListOption
              key="dob"
              label={<FormattedMessage id="date_of_birth" />}
              value={
                <FormattedDate
                  value={values.dob}
                  year="numeric"
                  month="2-digit"
                />
              }
              noArrow
            />
            <ListOption
              key="phone"
              label={<FormattedMessage id="telephone" />}
              value={splitPhoneNumber(values.phone)}
              noArrow
            />
          </>
        )}
    </View>
  );
};

const UserProfileEditScreen = ({ navigation }) => {
  const { authToken } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [updateUserProfileRequest] = useMutation(UPDATE_USER_PROFILE_EDIT_API);
  const { data, refetch } = useQuery(GET_USER_PROFILE_API, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
    fetchPolicy: 'network-only',
  });

  const handleDatePickerPress = () => {
    dispatch({ type: UPDATE_SHOW_DATE_PICKER, payload: !state.showDatePicker });
  };

  const handleSpacePress = () => {
    dispatch({ type: UPDATE_SHOW_DATE_PICKER, payload: false });
    Keyboard.dismiss();
  };

  const handleEditPress = () => {
    dispatch({ type: UPDATE_IS_EDITING });
  };

  const handleConfirmPress = () => {
    dispatch({ type: UPDATE_IS_CONFIRMED });
  };

  const handleCancelPress = () => {
    Keyboard.dismiss();
    dispatch({ type: UPDATE_IS_CANCELLED });
  };

  const handleSubmitPress = async values => {
    try {
      await updateUserProfileRequest({
        variables: {
          name: values.name,
          gender: values.gender,
          dateOfBirth: values.dob,
        },
        context: {
          headers: {
            authorization: authToken ? `Bearer ${authToken}` : '',
          },
        },
      });
    } catch (e) {
      console.error('Error in updating user profile edit screen', e);
    }
    dispatch({ type: RESET_FORM });
    Keyboard.dismiss();
    refetch();
  };

  const initialValues = {
    profilePicture: require('@/assets/dog_avatar.png'),
    name: data?.userProfile?.name,
    gender: genderOptions.find(
      gender => gender.value === data?.userProfile?.gender,
    )?.value,
    dob: data?.userProfile?.birthday,
    phone: data?.userProfile?.phoneNumber,
  };

  const validate = values => {
    dispatch({ type: UPDATE_IS_VALUE_CHANGED });
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
        headerLeft: () => <CancelButton onPress={handleCancelPress} />,
        headerRight: () => (
          <ConfirmButton
            onPress={handleConfirmPress}
            disabled={!state.isValuesChanged}
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerLeft: props => <CloseIconButton {...props} />,
        headerRight: () => <EditButton onPress={handleEditPress} />,
      });
    }
  }, [navigation, state]);

  return (
    <TouchableWithoutFeedback onPress={handleSpacePress}>
      <ModalContainer
        title={
          state.isEditing ? null : (
            <FormattedMessage id="profile" defaultMessage="Profile" />
          )
        }>
        <View behavior="position">
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={values => handleSubmitPress(values)}
              validate={values => validate(values)}>
              <UserProfileEditForm
                handleDatePickerPress={handleDatePickerPress}
                formState={state}
              />
            </Formik>
          </ScrollView>
        </View>
      </ModalContainer>
    </TouchableWithoutFeedback>
  );
};

export default UserProfileEditScreen;
