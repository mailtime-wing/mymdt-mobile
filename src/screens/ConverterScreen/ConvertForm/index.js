import React, {useState, useEffect, useCallback} from 'react';
import {
  FormattedMessage,
  FormattedNumber,
  FormattedTime,
  useIntl,
} from 'react-intl';
import {View, TouchableOpacity, Platform, TextInput} from 'react-native';
import {useFormikContext} from 'formik';
import {useTheme} from 'emotion-theming';
import {
  converterContainer,
  convertersContainer,
  toAmountText,
  input as inputStyle,
  margin,
  numberText,
  // errorText,
  convertIcon,
  conversionSection,
  leftContainer,
  textOnBackgroundHighEmphasis,
  textOnBackgroundDisabled,
  currencyName,
  convertTypeContainer,
  convertType,
} from './style';

import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import ConversionRate from '@/components/ConversionRate';
import ConvertIcon from '@/assets/convert.svg';

import KeyboardButtons from './KeyboardButtons';

const inputAccessoryViewID = 'converterButtons';

const ConvertForm = ({
  conversionRate,
  from,
  to,
  changeConvertCurrency,
  ...props
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const {values, setFieldValue, handleSubmit, isValid} = useFormikContext();
  const [toAmount, setToAmount] = useState(0);
  // const [clientError, setClientError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setToAmount(values.amount * conversionRate);
  }, [conversionRate, values]);

  const handleAmountValueOnChange = useCallback(
    (amount) => {
      setFieldValue('amount', amount);
    },
    [setFieldValue],
  );

  // const handleError = useCallback((error) => {
  //   setClientError(error);
  // }, []);

  const handleOnBlur = () => {
    setIsEditing(false);
  };

  const handleOnFocus = () => {
    setIsEditing(true);
  };

  return (
    <>
      <View style={conversionSection}>
        <View style={leftContainer}>
          <AppText variant="body1" style={textOnBackgroundHighEmphasis(theme)}>
            <FormattedMessage
              id="conversion_rate"
              defaultMessage="Conversion Rate"
            />
          </AppText>
          <AppText variant="caption" style={textOnBackgroundDisabled(theme)}>
            <FormattedMessage
              id="lastupdate_at"
              defaultMessage="Last update at {time}"
              values={{
                time: <FormattedTime value={new Date()} />,
              }}
            />
          </AppText>
        </View>
        <ConversionRate
          conversionRate={conversionRate}
          from={from}
          to={to}
          {...props}
        />
      </View>
      <View style={convertersContainer}>
        <View style={[converterContainer(theme, isEditing), margin]}>
          <View style={convertTypeContainer}>
            <AppText
              variant="overline"
              style={[textOnBackgroundDisabled(theme), convertType]}>
              <FormattedMessage id="from" defaultMessage="from" />
            </AppText>
            <AppText
              variant="heading6"
              style={[
                currencyName(theme),
                isEditing && {color: theme.colors.secondary.dark},
              ]}>
              <FormattedMessage id={`currencyDisplayName.${from}`} />
            </AppText>
          </View>
          {isEditing ? (
            <TextInput
              value={values.amount}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={handleAmountValueOnChange}
              onBlur={handleOnBlur}
              style={inputStyle(theme)}
            />
          ) : (
            <TextInput
              value={intl.formatNumber(values.amount)}
              onFocus={handleOnFocus}
              style={inputStyle(theme)}
            />
          )}
          {Platform.OS === 'ios' && (
            <KeyboardButtons
              inputAccessoryViewID={inputAccessoryViewID}
              handleAmountValueOnChange={handleAmountValueOnChange}
              from={from}
            />
          )}
        </View>
        <TouchableOpacity onPress={changeConvertCurrency} style={convertIcon}>
          <ConvertIcon fill={theme.colors.secondary.normal} />
        </TouchableOpacity>
        <View style={converterContainer(theme, false)}>
          <View style={convertTypeContainer}>
            <AppText
              variant="overline"
              style={[textOnBackgroundDisabled(theme), convertType]}>
              <FormattedMessage id="to" defaultMessage="to" />
            </AppText>
            <AppText variant="heading6" style={currencyName(theme)}>
              <FormattedMessage id={`currencyDisplayName.${to}`} />
            </AppText>
          </View>
          <AppText
            variant="heading1"
            style={numberText(theme)}
            numberOfLines={1}>
            <AppText variant="digit36" style={toAmountText(theme)}>
              <FormattedNumber value={toAmount} />
            </AppText>
          </AppText>
        </View>
      </View>
      {/* {!!clientError && (
        <AppText variant="label" style={errorText(theme)}>
          {clientError}
        </AppText>
      )} */}
      <AppButton
        onPress={handleSubmit}
        disabled={!isValid}
        text={<FormattedMessage id="button.convert" defaultMessage="convert" />}
        variant="filled"
        sizeVariant="large"
        colorVariant="secondary"
      />
    </>
  );
};

export default ConvertForm;
