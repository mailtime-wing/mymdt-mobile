import React, {useState, useEffect, useCallback} from 'react';
import {
  FormattedMessage,
  FormattedNumber,
  FormattedTime,
  useIntl,
} from 'react-intl';
import {
  View,
  InputAccessoryView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useFormikContext, useField} from 'formik';
import {useTheme} from 'emotion-theming';

import {GET_CURRENCY_BALANCE_API} from '@/api/data';
import useLazyQueryWithAuth from '@/hooks/useLazyQueryWithAuth';

import {
  ConvertersContainer,
  ConverterContainer,
  Input,
  Margin,
  InputAccessoryViewContainer,
  InputAccessoryButton,
  converterType,
  numberText,
  inputAccessoryButtonText,
  errorText,
  convertIcon,
  conversionSection,
  leftContainer,
  conversionRateText,
  conversionUpdateDate,
} from './style';

import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import LoadingSpinner from '@/components/LoadingSpinner';
import ConversionRate from '@/components/ConversionRate';
import ConvertIcon from '@/assets/convert.svg';

const inputAccessoryViewID = 'converterButtons';

const KeyboardButtons = ({handleConverterOnChange, from}) => {
  const theme = useTheme();
  const [getBalance, {data, loading}] = useLazyQueryWithAuth(
    GET_CURRENCY_BALANCE_API,
    {
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    if (data) {
      handleConverterOnChange(
        data?.userProfile?.currencyAccounts[0]?.balance || 0,
      );
    }
  }, [data, handleConverterOnChange]);

  const handleConvertAllPress = () => {
    getBalance({
      variables: {
        currencyCode: from,
      },
    });
  };

  return (
    <InputAccessoryView nativeID={inputAccessoryViewID}>
      <InputAccessoryViewContainer>
        <InputAccessoryButton onPress={() => handleConverterOnChange(0)}>
          <AppText variant="button" style={inputAccessoryButtonText(theme)}>
            <FormattedMessage id="button.clear" defaultMessage="clear" />
          </AppText>
        </InputAccessoryButton>
        <InputAccessoryButton onPress={handleConvertAllPress}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <AppText variant="button" style={inputAccessoryButtonText(theme)}>
              <FormattedMessage
                id="button.convert_all"
                defaultMessage="Convert all"
              />
            </AppText>
          )}
        </InputAccessoryButton>
      </InputAccessoryViewContainer>
    </InputAccessoryView>
  );
};

const ConverterInput = ({
  title,
  name,
  handleError,
  setFieldValue,
  ...props
}) => {
  const intl = useIntl();
  const [field, meta] = useField(name);
  const onError = meta.error;
  // TODO: handle when have error design

  const handleChange = (text) => {
    // TODO: handle other symbol in the future e.g. "1.000.000"
    let result = text;

    if (isNaN(text)) {
      result = Number(text.split(',').join(''));
    }

    setFieldValue('amount', result);
  };

  useEffect(() => {
    handleError(meta.error);
  }, [handleError, meta.error, onError]);

  return (
    <>
      <Input
        value={intl.formatNumber(field.value)}
        onChangeText={handleChange}
        {...props}
      />
    </>
  );
};

const ConvertForm = ({
  conversionRate,
  from,
  to,
  changeConvertCurrency,
  ...props
}) => {
  const theme = useTheme();
  const {values, setFieldValue, handleSubmit, isValid} = useFormikContext();
  const [isAmountFocus, setIsAmountFocus] = useState(false);
  const [toAmount, setToAmount] = useState(0);
  const [clientError, setClientError] = useState('');

  useEffect(() => {
    setToAmount(values.amount * conversionRate);
  }, [conversionRate, values]);

  const handleOnBlur = () => {
    setIsAmountFocus(false);
  };

  const handleConverterOnChange = useCallback(
    (amount) => {
      setFieldValue('amount', amount);
    },
    [setFieldValue],
  );

  const handleError = useCallback((error) => {
    setClientError(error);
  }, []);

  return (
    <>
      <View style={conversionSection}>
        <View style={leftContainer}>
          <AppText variant="body1" style={conversionRateText(theme)}>
            <FormattedMessage
              id="conversion_rate"
              defaultMessage="Conversion Rate"
            />
          </AppText>
          <AppText variant="caption" style={conversionUpdateDate(theme)}>
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
      <ConvertersContainer>
        <ConverterContainer
          onBlur={handleOnBlur}
          onFocus={() => setIsAmountFocus(true)}
          isFocus={isAmountFocus}>
          <AppText variant="value" style={converterType(theme, isAmountFocus)}>
            <FormattedMessage id={`currencyDisplayName.${from}`} />
          </AppText>
          <ConverterInput
            keyboardType="numeric"
            name="amount"
            inputAccessoryViewID={inputAccessoryViewID}
            editable={true}
            handleError={handleError}
            setFieldValue={setFieldValue}
          />
          {Platform.OS === 'ios' && (
            <KeyboardButtons
              handleConverterOnChange={handleConverterOnChange}
              from={from}
            />
          )}
        </ConverterContainer>
        <Margin />
        <TouchableOpacity onPress={changeConvertCurrency} style={convertIcon}>
          <ConvertIcon fill={theme.colors.secondary.normal} />
        </TouchableOpacity>
        <ConverterContainer isFocus={false}>
          <AppText variant="value" style={converterType(theme)}>
            <FormattedMessage id={`currencyDisplayName.${to}`} />
          </AppText>
          <AppText
            variant="heading1"
            style={numberText(theme)}
            numberOfLines={1}>
            <FormattedNumber value={toAmount} />
          </AppText>
        </ConverterContainer>
      </ConvertersContainer>
      {!!clientError && (
        <AppText variant="label" style={errorText(theme)}>
          {clientError}
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
