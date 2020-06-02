import React, {useState, useEffect, useRef} from 'react';
import {useTheme} from 'emotion-theming';
import {Keyboard} from 'react-native';
import {FormattedMessage, FormattedDate} from 'react-intl';
import ImagePicker from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Container,
  GenderText,
  UserIcon,
  Input,
  ButtonContainer,
  DatePickerContainer,
  DatePickerButton,
  DatePickerButtonDone,
  DatePickerButtonCancel,
  DatePickerIOS,
} from './style';
import {Formik, useFormikContext} from 'formik';

import ModalContaienr from '@/components/ModalContainer';
import ProfileDataRow from '@/components/ProfileDataRow';
import Button from '@/components/Button';
import GenderSelector, {genderOptions} from '@/components/GenderSelector';

const options = {
  title: 'CHANGE PROFILE PHOTO',
  customButtons: [{name: 'REMOVE', title: 'Remove Current Photo'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const UserProfileEditForm = () => {
  const refRBSheet = useRef();
  const refRBSheetDOB = useRef();
  const theme = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const {
    handleChange,
    setFieldValue,
    values,
    touched,
    setFieldTouched,
    resetForm,
    handleSubmit,
  } = useFormikContext();
  const [originalValue, setOriginalValue] = useState(null);
  const [activeField, setActiveField] = useState('');

  useEffect(() => {
    if (activeField !== '') {
      if (values[activeField] === originalValue[activeField]) {
        setConfirm(false);
      } else {
        setConfirm(true);
      }
    }
  }, [activeField, values, originalValue]);

  const activateField = field => {
    setIsEditing(true);
    setOriginalValue(values);
    setActiveField(field);
    setFieldTouched(field, true);
  };

  const deactivateField = field => {
    setActiveField('');
    setFieldTouched(field, false);
  };

  const handleCancellPress = () => {
    Keyboard.dismiss();
    resetForm();
    setIsEditing(false);
  };

  const handleConfirmPress = () => {
    setIsEditing(false);
    setOriginalValue(values);
    setFieldValue(activeField, values[activeField]);
    handleSubmit();
  };

  const handleCameraPress = () => {
    const field = 'profilePicture';
    activateField(field);
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // handle cancel
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        setFieldValue(field, null);
      } else {
        const source = {uri: response.uri};
        if (source) {
          setFieldValue(field, source);
        }
      }
    });
    deactivateField(field);
  };

  const handleGenderPress = () => {
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  };

  const handleDobPress = () => {
    if (refRBSheetDOB.current) {
      refRBSheetDOB.current.open();
    }
  };

  const handleCancelPress = () => {
    if (refRBSheetDOB.current) {
      refRBSheetDOB.current.close();
      resetForm();
    }
  };

  const handleDonePress = () => {
    if (refRBSheetDOB.current) {
      refRBSheetDOB.current.close();
    }
  };

  return (
    <Container>
      {isEditing && (
        <ButtonContainer active>
          <Button reverse onPress={() => handleCancellPress()}>
            Cancel
          </Button>
          <Button disabled={!confirm} onPress={() => handleConfirmPress()}>
            Confirm
          </Button>
        </ButtonContainer>
      )}
      <ProfileDataRow
        active={touched.profilePicture}
        label={'Profile Picture'}
        value={<UserIcon source={values.profilePicture} />}
        onPress={() => handleCameraPress()}
      />
      <ProfileDataRow
        active={touched.nickName}
        label={'Nickname'}
        value={
          <Input
            onChangeText={handleChange('nickName')}
            onFocus={() => activateField('nickName')}
            onBlur={() => deactivateField('nickName')}
            value={values.nickName}
          />
        }
      />
      <ProfileDataRow
        active={touched.phone}
        label={'Telephone'}
        value={
          <Input
            onChangeText={handleChange('phone')}
            onFocus={() => activateField('phone')}
            onBlur={() => deactivateField('phone')}
            value={values.phone}
          />
        }
      />
      <ProfileDataRow
        label={'Gender'}
        value={<GenderText>{values.gender}</GenderText>}
        onPress={() => handleGenderPress()}
      />
      <ProfileDataRow
        label={'Date of Bath'}
        value={<FormattedDate value={values.dob} />}
        onPress={() => handleDobPress()}
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            flex: 1,
            paddingHorizontal: 30,
            paddingVertical: 26,
            borderRadius: 24,
            alignItems: 'center',
          },
          wrapper: {
            backgroundColor: theme.colors.black.superLight,
            paddingHorizontal: 10,
            marginBottom: 10,
          },
          draggableIcon: {
            backgroundColor: theme.colors.black.normal,
          },
        }}>
        <GenderSelector gender={values.gender} setFieldValue={setFieldValue} />
      </RBSheet>

      <RBSheet
        ref={refRBSheetDOB}
        animationType="slide"
        // closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            flex: 1,
            paddingHorizontal: 30,
            paddingVertical: 26,
            borderRadius: 24,
          },
          wrapper: {
            backgroundColor: theme.colors.black.superLight,
            paddingHorizontal: 10,
            marginBottom: 10,
          },
          draggableIcon: {
            backgroundColor: theme.colors.black.normal,
          },
        }}>
        <DatePickerContainer>
          <DatePickerButton onPress={() => handleCancelPress()}>
            <DatePickerButtonCancel>Cancel</DatePickerButtonCancel>
          </DatePickerButton>
          <DatePickerButton onPress={() => handleDonePress()}>
            <DatePickerButtonDone>Done</DatePickerButtonDone>
          </DatePickerButton>
        </DatePickerContainer>
        <DatePickerIOS
          mode="date"
          date={values.dob}
          onDateChange={date => setFieldValue('dob', date)}
        />
      </RBSheet>
    </Container>
  );
};

const UserProfileEditScreen = () => {
  return (
    <ModalContaienr title={<FormattedMessage id="edit_profile" />}>
      <Container>
        <Formik
          initialValues={{
            profilePicture: require('@/assets/zt-mask.jpg'),
            nickName: 'Bob',
            phone: '+852 23131411',
            gender: genderOptions[0].value,
            dob: new Date(),
          }}
          onSubmit={values => console.log(values)}>
          <UserProfileEditForm />
        </Formik>
      </Container>
    </ModalContaienr>
  );
};

export default UserProfileEditScreen;
