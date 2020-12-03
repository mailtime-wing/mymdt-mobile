import React, {useEffect} from 'react';
import {View} from 'react-native';
import CarrierInfo from 'react-native-carrier-info';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import {Formik, useFormikContext} from 'formik';

import Input from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import HeaderTitle from '@/components/HeaderTitle';
import AppKeyboardAvoidingView from '@/components/AppKeyboardAvoidingView';

import {
  PhoneSectionContainer,
  PhonePrefixContainer,
  PhoneContainer,
  termsStyle,
  container,
  formView,
  formBody,
} from './style';
import countryCodeData from '@/constants/countryCode';

const InternalLoginForm = ({title, submitButtonText, description}) => {
  const theme = useTheme();
  const {setFieldValue, handleSubmit, isValid} = useFormikContext();

  // get phone prefix
  useEffect(() => {
    const getPhonePrefix = async () => {
      try {
        const result = await CarrierInfo.isoCountryCode();
        if (result) {
          let dialCode = countryCodeData.find(
            (c) => c.code === result.toUpperCase(),
          )?.dial_code;
          if (dialCode) {
            setFieldValue('phonePrefix', dialCode);
            return;
          }
        }
      } catch (e) {}
      setFieldValue('phonePrefix', '+');
    };
    getPhonePrefix();
  }, [setFieldValue]);

  return (
    <AppKeyboardAvoidingView style={container} behavior="padding">
      <View style={formView}>
        <View>
          {title && <HeaderTitle>{title}</HeaderTitle>}
          <View style={formBody}>
            <PhoneSectionContainer>
              <PhonePrefixContainer>
                <Input
                  keyboardType="phone-pad"
                  label={<FormattedMessage id="phone_number" />}
                  name="phonePrefix"
                />
              </PhonePrefixContainer>
              <PhoneContainer>
                <Input keyboardType="phone-pad" name="phone" />
              </PhoneContainer>
            </PhoneSectionContainer>
          </View>
        </View>
        <View style={formBody}>
          {description && (
            <AppText variant="caption" style={termsStyle(theme)}>
              {description}
            </AppText>
          )}
          <AppButton
            onPress={handleSubmit}
            text={submitButtonText}
            disabled={!isValid}
            variant="filled"
            sizeVariant="large"
            colorVariant="secondary"
          />
        </View>
      </View>
    </AppKeyboardAvoidingView>
  );
};

const validate = (values) => {
  const errors = {};
  const dialCodeRegex = /^(\+)(\d{1,3}|\d{1,4})$/;

  if (!dialCodeRegex.test(values.phonePrefix)) {
    errors.phonePrefix = (
      <FormattedMessage id="error.required" defaultMessage="Required" />
    );
  }

  if (!values.phone) {
    errors.phone = (
      <FormattedMessage id="error.required" defaultMessage="Required" />
    );
  }

  return errors;
};

const LoginForm = ({
  title,
  description,
  submitButtonText,
  onSendPress,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={{
        phone: '',
        phonePrefix: '',
      }}
      onSubmit={onSubmit}
      validate={validate}>
      <InternalLoginForm
        submitButtonText={submitButtonText}
        onSendPress={onSendPress}
        description={description}
        title={title}
      />
    </Formik>
  );
};

export default LoginForm;
