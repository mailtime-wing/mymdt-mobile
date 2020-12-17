import React, {useState, useContext, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {FormattedMessage, useIntl} from 'react-intl';
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
import getAge from '@/utils/getAge';
import errorCodeEnum from '@/enum/errorCode';

import {
  Container,
  FormContainer,
  titleStyle,
  detailStyle,
  errorStyle,
  requiredText,
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

const UserProfileSetupOnboardingScreen = () => {
  const theme = useTheme();
  const intl = useIntl();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [updateUserProfileRequest] = useMutationWithAuth(
    UPDATE_USER_PROFILE_API,
    {
      context: {
        errorMessageHandler: {
          errorMap: {
            [errorCodeEnum.DATA_NOT_FOUND]: intl.formatMessage({
              id: 'error.user_profile_setup_referral_code_invalid',
            }),
            [errorCodeEnum.ACTION_NOT_AVAILABLE]: intl.formatMessage({
              id: 'error.user_profile_setup_referral_code_invalid',
            }),
            [errorCodeEnum.DATA_INVALID]: ({field}) => {
              console.log('field', field);
              switch (field) {
                case 'dateOfBirth': {
                  return intl.formatMessage(
                    {
                      id: 'error.user_profile_setup_miniumn_age_required',
                    },
                    {
                      age: 16,
                    },
                  );
                }
                case 'otp': {
                  return intl.formatMessage(
                    {
                      id: 'error.error_code_202_with_field',
                    },
                    {
                      field: intl.formatMessage({
                        id: 'verification_code',
                      }),
                    },
                  );
                }
              }
            },
          },
        },
      },
    },
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
      // TODO: use setErrors from formik to make invalid field red?
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = (
        <FormattedMessage id="error.user_profile_setup_name_required" />
      );
    }

    if (values.dob) {
      const age = getAge(new Date(values.dob));
      if (age < 16) {
        errors.dob = (
          <FormattedMessage
            id="error.user_profile_setup_miniumn_age_required"
            values={{age: 16}}
          />
        );
      }
    }

    return errors;
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleSpacePress()}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : ''}>
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
                dob: new Date('1990/1/1'),
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

export default UserProfileSetupOnboardingScreen;
