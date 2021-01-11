import React, {useEffect, useState} from 'react';
import {View, Platform} from 'react-native';
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
import LoadingSpinner from '@/components/LoadingSpinner';

const InternalLoginForm = ({
  title,
  submitButtonText,
  description,
  otpLoading,
}) => {
  const theme = useTheme();
  const {setFieldValue, handleSubmit, isValid} = useFormikContext();
  const [autoFocusOnPrefix, setAutoFocusOnPrefix] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(false);
            return;
          }
        }
      } catch {}
      setFieldValue('phonePrefix', '+');
      setAutoFocusOnPrefix(true);
      setIsLoading(false);
    };
    getPhonePrefix();
  }, [setFieldValue]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AppKeyboardAvoidingView
      style={container}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <View style={formView(theme)}>
        <View>
          {title && <HeaderTitle>{title}</HeaderTitle>}
          <View style={formBody}>
            <PhoneSectionContainer>
              <PhonePrefixContainer>
                <Input
                  keyboardType="phone-pad"
                  label={<FormattedMessage id="phone_number" />}
                  name="phonePrefix"
                  autoFocus={autoFocusOnPrefix}
                />
              </PhonePrefixContainer>
              <PhoneContainer>
                <Input
                  keyboardType="phone-pad"
                  name="phone"
                  autoFocus={!autoFocusOnPrefix}
                />
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
            isLoading={otpLoading}
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

const LoginForm = ({onSubmit, ...props}) => {
  return (
    <Formik
      initialValues={{
        phone: '',
        phonePrefix: '',
      }}
      onSubmit={onSubmit}
      validate={validate}>
      <InternalLoginForm {...props} />
    </Formik>
  );
};

export default LoginForm;
