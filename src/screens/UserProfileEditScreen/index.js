import React, {useContext, useLayoutEffect, useEffect, useReducer} from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';
import ImagePicker from 'react-native-image-picker';
import {Formik, useFormikContext} from 'formik';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {UPDATE_USER_PROFILE_EDIT_API, GET_USER_PROFILE_API} from '@/api/data';
import {AuthContext} from '@/context/auth';

import {
  Container,
  UserIcon,
  FillIcon,
  Error,
  DateFieldContainer,
  ScrollContainer,
  FormContainer,
  ProfilePictureContainer,
  ProfilePictureText,
  UserIconContainer,
} from './style';

import GenderSelector, {genderOptions} from '@/components/GenderSelector';
import DateTimeSelector from '@/components/DateTimeSelector';

import ModalContainer from '@/components/ModalContainer';
import EditButton from '@/components/EditButton';
import CancelButton from '@/components/CancelButton';
import ConfirmButton from '@/components/ConfirmButton';
import CloseButton from '@/components/CloseButton';
import Input from '@/components/AppInput';
import FormInput from '@/components/Input';

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
  customButtons: [{name: 'REMOVE', title: 'Remove Current Photo'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const UserProfileEditForm = ({
  handleDatePickerPress,
  formState,
  changeDateFormat,
}) => {
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

  const handleDateChange = date => {
    setFieldValue('dob', date);
  };

  const handleCameraPress = () => {
    ImagePicker.showImagePicker(cameraOptions, response => {
      if (response.didCancel) {
        // handle cancel
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        setFieldValue('profilePicture', null);
      } else {
        const source = {uri: response.uri};
        if (source) {
          setFieldValue('profilePicture', source);
        }
      }
    });
  };

  return (
    <FormContainer pointerEvents={formState.isEditing ? 'auto' : 'none'}>
      <ProfilePictureContainer>
        <ProfilePictureText>
          <FormattedMessage id="profile_photo" defaultMessage="profile photo" />
        </ProfilePictureText>
        <UserIconContainer onPress={() => handleCameraPress()}>
          <UserIcon source={values.profilePicture} />
        </UserIconContainer>
        <FillIcon source={require('@/assets/filled.png')} />
      </ProfilePictureContainer>

      <Input label={<FormattedMessage id="your_name" />} required name="name" />
      <GenderSelector gender={values.gender} setFieldValue={setFieldValue} />
      <Error>{errors.gender ? errors.gender : ' '}</Error>
      <DateFieldContainer onPress={handleDatePickerPress}>
        <FormInput // use old input becoz of date format
          label={<FormattedMessage id="date_of_birth" />}
          required
          value={changeDateFormat(values.dob)}
          name="dob"
          editable={false}
          remark={<FormattedMessage id="claim_gift_on_birthday" />}
          placeholder="DD/MM/YYYY"
          pointerEvents="none"
        />
        {formState.showDatePicker && (
          <DateTimeSelector date={values.dob} onChange={handleDateChange} />
        )}
      </DateFieldContainer>
    </FormContainer>
  );
};

const UserProfileEditScreen = ({navigation}) => {
  const intl = useIntl();
  const {authToken} = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [updateUserProfileRequest] = useMutation(UPDATE_USER_PROFILE_EDIT_API);
  const {data, refetch} = useQuery(GET_USER_PROFILE_API, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    },
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
    dispatch({type: RESET_FORM});
    Keyboard.dismiss();
    refetch();
  };

  const changeDateFormat = isoDate => {
    return intl.formatDate(isoDate, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const initialValues = {
    profilePicture: require('@/assets/zt-mask.jpg'),
    name: data?.userProfile.name,
    gender: genderOptions.find(
      gender => gender.value === data?.userProfile.gender,
    )?.value,
    dob: data?.userProfile.birthday,
  };

  const validate = values => {
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
        headerLeft: props => <CloseButton {...props} />,
        headerRight: () => <EditButton onPress={handleEditPress} />,
      });
    }
  }, [navigation, state]);

  return (
    <TouchableWithoutFeedback onPress={handleSpacePress}>
      <ModalContainer
        title={<FormattedMessage id="edit_profile" defaultMessage="Profile" />}>
        <Container behavior="position">
          <ScrollContainer
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
                changeDateFormat={changeDateFormat}
              />
            </Formik>
          </ScrollContainer>
        </Container>
      </ModalContainer>
    </TouchableWithoutFeedback>
  );
};

export default UserProfileEditScreen;
