import React, {useState, useContext, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {Formik, useFormikContext} from 'formik';
import {useTheme} from 'emotion-theming';

import Input from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import GenderSelector, {genderOptions} from '@/components/GenderSelector';
import DateTimePickerInput from '@/components/DateTimePickerInput';
import AppText from '@/components/AppText2';
import useSetupFlow from '@/hooks/useSetupFlow';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';
import {BranchContext} from '@/context/branch';
import {UPDATE_USER_PROFILE_API} from '@/api/data';

import {
  Container,
  FormContainer,
  titleStyle,
  detailStyle,
  errorStyle,
  requiredText,
  dateContainer,
} from './style';

const UserProfileForm = ({
  showDatePicker,
  handleDatePickerPress,
  theme,
  referralCode,
}) => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    isValid,
  } = useFormikContext();

  useEffect(() => {
    if (referralCode) {
      setFieldValue('referralCode', referralCode);
    }
  }, [setFieldValue, referralCode]);

  return (
    <FormContainer>
      <Input label={<FormattedMessage id="your_name" />} required name="name" />
      <GenderSelector gender={values.gender} setFieldValue={setFieldValue} />
      <AppText variant="caption" style={errorStyle(theme)}>
        {errors.gender ? errors.gender : ' '}
      </AppText>
      <DateTimePickerInput
        onPress={handleDatePickerPress}
        style={dateContainer}
        label={
          <FormattedMessage id="date_of_birth" defaultMessage="DATE OF BIRTH" />
        }
        required
        name="dob"
        showDatePicker={showDatePicker}
        onDismiss={handleDatePickerPress}
      />
      <Input
        label={<FormattedMessage id="referral_code" />}
        name="referralCode"
      />
      <AppButton
        onPress={handleSubmit}
        title="Submit"
        disabled={!isValid}
        text={<FormattedMessage id="button.submit" defaultMessage="submit" />}
        variant="filled"
        sizeVariant="large"
        colorVariant="secondary"
      />
    </FormContainer>
  );
};

const UserProfileScreen = () => {
  const theme = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [updateUserProfileRequest] = useMutationWithAuth(
    UPDATE_USER_PROFILE_API,
  );
  const {navigateByFlow} = useSetupFlow();
  const {referringParams} = useContext(BranchContext);

  const handleDatePickerPress = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleSpacePress = () => {
    setShowDatePicker(false);
    Keyboard.dismiss();
  };

  const handleSubmitPress = async (values) => {
    try {
      await updateUserProfileRequest({
        variables: {
          name: values.name,
          gender: values.gender,
          dateOfBirth: values.dob.toISOString(),
          referralCode: values.referralCode,
        },
      });
      navigateByFlow();
    } catch (e) {
      console.error(e);
      // handle error later
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Name Required';
    }
    if (!values.gender) {
      errors.gender = 'Gender Required';
    }
    return errors;
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleSpacePress()}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView behavior="position">
          <Container>
            <AppText variant="heading1" style={titleStyle(theme)}>
              <FormattedMessage
                id="set_up_profile"
                defaultMessage="Set Up Profile"
              />
            </AppText>
            <AppText variant="body2" style={detailStyle(theme)}>
              <FormattedMessage id="we_hope_to_provide" />
            </AppText>
            <AppText variant="body2" style={requiredText(theme)}>
              <FormattedMessage
                id="star_means_required"
                defaultMessage="* means required"
              />
            </AppText>
            <Formik
              initialValues={{
                name: '',
                gender: genderOptions[0].value,
                dob: new Date(),
                referralCode: referringParams?.referralCode || '',
              }}
              onSubmit={(values) => handleSubmitPress(values)}
              validate={(values) => validate(values)}>
              <UserProfileForm
                showDatePicker={showDatePicker}
                handleDatePickerPress={handleDatePickerPress}
                theme={theme}
                referralCode={referringParams?.referralCode || ''}
              />
            </Formik>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default UserProfileScreen;
