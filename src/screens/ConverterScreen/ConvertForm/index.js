import React, {useState, useCallback} from 'react';
import {FormattedMessage, FormattedTime, useIntl} from 'react-intl';
import {View, TouchableOpacity, Platform, TextInput} from 'react-native';
import {useFormikContext} from 'formik';
import {useTheme} from 'emotion-theming';
import {
  converterContainer,
  convertersContainer,
  input as inputStyle,
  margin,
  errorText,
  convertIcon,
  conversionSection,
  leftContainer,
  textOnBackgroundHighEmphasis,
  textOnBackgroundDisabled,
  currencyName as currencyNameStyle,
  convertTypeContainer,
  convertType,
} from './style';

import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import ConversionRate from '@/components/ConversionRate';
import ConvertIcon from '@/assets/convert.svg';
import isNumeric from '@/utils/isNumeric';

import KeyboardButtons from './KeyboardButtons';

const inputAccessoryViewID = 'converterButtons';

const AmountInput = ({
  style,
  focus,
  title,
  currencyName,
  editable,
  ...props
}) => {
  const theme = useTheme();
  return (
    <View style={[converterContainer(theme, focus), style]}>
      <View style={convertTypeContainer}>
        <AppText
          variant="overline"
          style={[textOnBackgroundDisabled(theme), convertType]}>
          {title}
        </AppText>
        <AppText
          variant="heading6"
          style={[
            currencyNameStyle(theme),
            focus && {color: theme.colors.secondary.dark},
          ]}>
          {currencyName}
        </AppText>
      </View>
      <TextInput
        style={inputStyle(theme, !editable)}
        editable={editable}
        {...props}
      />
    </View>
  );
};
AmountInput.defaultProps = {
  editable: true,
};

const ConvertForm = ({
  conversionRate,
  from,
  to,
  changeConvertCurrency,
  ...props
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const {
    values,
    handleSubmit,
    isValid,
    handleBlur: handleBlurForFormik,
    handleChange,
    errors,
  } = useFormikContext();
  // TODO: use formik's own focus state when it is ready: https://github.com/formium/formik/pull/2317
  const [focus, setFocus] = useState(false);

  const handleAmountChange = useCallback(
    (amount) => {
      if (typeof amount !== 'string') {
        amount = String(amount);
      }

      if (!amount && amount !== 0) {
        handleChange('amount')('');
        return;
      }

      if (!isNumeric(amount)) {
        return;
      }

      handleChange('amount')(amount);
    },
    [handleChange],
  );

  const handleBlur = (e) => {
    setFocus(false);
    handleBlurForFormik('amount')(e);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const toAmount = values.amount * conversionRate;

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
              defaultMessage="Last update at {time} "
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
        <AmountInput
          style={margin}
          focus={focus}
          title={<FormattedMessage id="from" defaultMessage="from" />}
          currencyName={<FormattedMessage id={`currencyDisplayName.${from}`} />}
          value={focus ? values.amount : intl.formatNumber(values.amount)}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={handleAmountChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          keyboardType="numeric"
          autoFocus
        />
        {Platform.OS === 'ios' && (
          <KeyboardButtons
            inputAccessoryViewID={inputAccessoryViewID}
            handleAmountValueOnChange={handleAmountChange}
            from={from}
          />
        )}
        <TouchableOpacity onPress={changeConvertCurrency} style={convertIcon}>
          <ConvertIcon fill={theme.colors.secondary.normal} />
        </TouchableOpacity>
        <AmountInput
          focus={false}
          title={<FormattedMessage id="to" defaultMessage="to" />}
          currencyName={<FormattedMessage id={`currencyDisplayName.${to}`} />}
          value={intl.formatNumber(toAmount)}
          editable={false}
        />
      </View>
      {!!errors.amount && (
        <AppText variant="caption" style={errorText(theme)}>
          {errors.amount}
        </AppText>
      )}
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
