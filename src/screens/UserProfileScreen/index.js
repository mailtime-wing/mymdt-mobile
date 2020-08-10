import React, {useState, useContext} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {Formik, useFormikContext} from 'formik';
import {useMutation} from '@apollo/react-hooks';

import {AuthContext} from '@/context/auth';
import Input from '@/components/AppInput';
import ThemeButton from '@/components/ThemeButton';
import useSetupFlow from '@/hooks/useSetupFlow';
import {UPDATE_USER_PROFILE_API} from '@/api/data';
import GenderSelector, {genderOptions} from '@/components/GenderSelector';
import DateTimePickerInput from '@/components/DateTimePickerInput';

import {
  Container,
  FormContainer,
  Title,
  Detail,
  RequiredText,
  Error,
  DateFieldContainer,
} from './style';

const UserProfileForm = ({showDatePicker, handleDatePickerPress}) => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    isValid,
  } = useFormikContext();

  return (
    <FormContainer>
      <Input label={<FormattedMessage id="your_name" />} required name="name" />
      <GenderSelector gender={values.gender} setFieldValue={setFieldValue} />
      <Error>{errors.gender ? errors.gender : ' '}</Error>
      <DateFieldContainer onPress={handleDatePickerPress}>
        <DateTimePickerInput
          label={
            <FormattedMessage
              id="date_of_birth"
              defaultMessage="DATE OF BIRTH"
            />
          }
          required
          name="dob"
          showDatePicker={showDatePicker}
        />
      </DateFieldContainer>
      <Input
        label={<FormattedMessage id="referral_code" />}
        remark={
          <FormattedMessage
            id="edit_prefernece_afterward"
            defaultMessage="You can fill in later in profile page"
          />
        }
        name="referralCode"
      />
      <ThemeButton onPress={handleSubmit} title="Submit" disabled={!isValid}>
        <FormattedMessage id="submit" defaultMessage="submit" />
      </ThemeButton>
    </FormContainer>
  );
};

const UserProfileScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [updateUserProfileRequest] = useMutation(UPDATE_USER_PROFILE_API);
  const {authToken} = useContext(AuthContext);
  const {navigateByFlow} = useSetupFlow();

  const handleDatePickerPress = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleSpacePress = () => {
    setShowDatePicker(false);
    Keyboard.dismiss();
  };

  const handleSubmitPress = async values => {
    try {
      await updateUserProfileRequest({
        variables: {
          name: values.name,
          gender: values.gender,
          dateOfBirth: values.dob.toISOString(),
          referralCode: values.referralCode,
        },
        context: {
          headers: {
            authorization: authToken ? `Bearer ${authToken}` : '',
          },
        },
      });
      navigateByFlow();
    } catch (e) {
      console.error(e);
      // handle error later
    }
  };

  const validate = values => {
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
            <Title>
              <FormattedMessage id="let_us_know" />
            </Title>
            <Detail>
              <FormattedMessage id="we_hope_to_provide" />
            </Detail>
            <RequiredText>* means required</RequiredText>
            <Formik
              initialValues={{
                name: '',
                gender: genderOptions[0].value,
                dob: new Date(),
                referralCode: '',
              }}
              onSubmit={values => handleSubmitPress(values)}
              validate={values => validate(values)}>
              <UserProfileForm
                showDatePicker={showDatePicker}
                handleDatePickerPress={handleDatePickerPress}
              />
            </Formik>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default UserProfileScreen;
