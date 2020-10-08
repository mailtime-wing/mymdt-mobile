import React, {useEffect} from 'react';
import {View} from 'react-native';
import CarrierInfo from 'react-native-carrier-info';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import {Formik, useFormikContext} from 'formik';

import Input from '@/components/AppInput';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';

import {
  Container,
  PhoneSectionContainer,
  PhonePrefixContainer,
  PhoneContainer,
  titleStyle,
  termsStyle,
} from './style';
import countryCodeData from '@/constants/countryCode';

const InternalLoginForm = ({submitButtonText, description, theme}) => {
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
    <View>
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
  const theme = useTheme();

  return (
    <Container>
      {title && (
        <AppText variant="pageTitle" style={titleStyle(theme)}>
          {title}
        </AppText>
      )}
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
          theme={theme}
        />
      </Formik>
    </Container>
  );
};

export default LoginForm;
