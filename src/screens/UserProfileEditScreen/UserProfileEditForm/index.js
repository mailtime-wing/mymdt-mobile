import React, {useEffect} from 'react';
import {View} from 'react-native';
import {FormattedMessage, FormattedDate} from 'react-intl';
import {useFormikContext} from 'formik';

import {
  errorStyle,
  formContainer,
  nameStyle,
  dateFieldContainer,
  profilePictureText,
  profilePictureContainer,
  editingStyle,
  container,
} from './style';

import GenderSelector, {genderOptions} from '@/components/GenderSelector';
import DateTimePickerInput from '@/components/DateTimePickerInput';
import ListOption from '@/components/ListOption';

import Input from '@/components/AppInput';
import AppAvator from '@/components/AppAvator';
import AppText from '@/components/AppText2';
import HeaderTitle from '@/components/HeaderTitle';

import splitPhoneNumber from '@/utils/splitPhoneNumber';
import {useTheme} from 'emotion-theming';

const UserProfileEditForm = ({handleDatePickerPress, formState}) => {
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

  return (
    <View>
      {!formState.isEditing && (
        <HeaderTitle>
          <FormattedMessage id="profile" defaultMessage="Profile" />
        </HeaderTitle>
      )}
      <View style={container}>
        {formState.isEditing ? (
          <View
            style={formContainer}
            pointerEvents={formState.isEditing ? 'auto' : 'none'}>
            <View style={[profilePictureContainer, editingStyle]}>
              <AppText variant="label" style={profilePictureText(theme)}>
                <FormattedMessage
                  id="profile_photo"
                  defaultMessage="profile photo"
                />
              </AppText>
              <View>
                <AppAvator
                  variant="image"
                  sizeVariant="normal"
                  imageSrc={require('@/assets/rewardme_avatar.png')}
                />
              </View>
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
            <DateTimePickerInput
              style={dateFieldContainer}
              onPress={handleDatePickerPress}
              label={
                <FormattedMessage
                  id="date_of_birth"
                  defaultMessage="DATE OF BIRTH"
                />
              }
              required
              name="dob"
              showDatePicker={formState.showDatePicker}
              onDismiss={handleDatePickerPress}
            />
          </View>
        ) : (
          <View>
            <View style={profilePictureContainer}>
              <AppAvator
                variant="image"
                sizeVariant="normal"
                imageSrc={require('@/assets/rewardme_avatar.png')}
              />
              <AppText variant="subTitle1" style={nameStyle(theme)}>
                {values.name}
              </AppText>
            </View>
            <ListOption
              key="gender"
              label={<FormattedMessage id="gender" />}
              value={
                genderOptions.find((gender) => gender.value === values.gender)
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
          </View>
        )}
      </View>
    </View>
  );
};

export default UserProfileEditForm;
