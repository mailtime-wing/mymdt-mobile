import React, {useState, useEffect, useCallback} from 'react';
import {
  FormattedMessage,
  FormattedTime,
  FormattedNumber,
  useIntl,
} from 'react-intl';
import {InputAccessoryView} from 'react-native';
import {useFormikContext, useField} from 'formik';
import {MEASURABLE_REWARD_POINT} from '@/constants/currency';
import {useTheme} from 'emotion-theming';
import {GET_CURRENCY_BALANCE_API} from '@/api/data';
import useLazyQueryWithAuth from '@/hooks/useLazyQueryWithAuth';

import {
  RowContainer,
  ConversionRateLeftContainer,
  ConversionRateRightContainer,
  ConvertersContainer,
  ConverterContainer,
  Input,
  Margin,
  InputAccessoryViewContainer,
  InputAccessoryButton,
  almostEqualSymbol,
  conversionRateText,
  conversionUpdateDate,
  converterType,
  numberText,
  inputAccessoryButtonText,
  errorText,
  styles,
} from './style';

import ThemeButton from '@/components/ThemeButton';
import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';
import AppText from '@/components/AppText2';
import LoadingSpinner from '@/components/LoadingSpinner';

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
            <FormattedMessage id="clear" defaultMessage="clear" />
          </AppText>
        </InputAccessoryButton>
        <InputAccessoryButton onPress={handleConvertAllPress}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <AppText variant="button" style={inputAccessoryButtonText(theme)}>
              <FormattedMessage id="convert_all" defaultMessage="Convert all" />
            </AppText>
          )}
        </InputAccessoryButton>
      </InputAccessoryViewContainer>
    </InputAccessoryView>
  );
};

const ConverterInput = ({title, name, handleError, ...props}) => {
  const intl = useIntl();
  const [field, meta] = useField(name);
  const onError = meta.error;
  // TODO: handle when have error design

  useEffect(() => {
    handleError(meta.error);
  }, [handleError, meta.error, onError]);

  return (
    <>
      <Input
        value={intl.formatNumber(field.value)}
        onChangeText={field.onChange(name)}
        {...props}
      />
    </>
  );
};

const ConversionRate = ({conversionRate, isMrp}) => {
  const theme = useTheme();

  return (
    <>
      <RowContainer>
        <ConversionRateLeftContainer>
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
        </ConversionRateLeftContainer>
        <ConversionRateRightContainer>
          {isMrp ? (
            <>
              <MRPCoin
                amount={1}
                size={16}
                fontSize={16}
                color={theme.colors.textOfMrp}
              />
              <AppText variant="body2" style={almostEqualSymbol(theme)}>
                ≈
              </AppText>
              <MDTCoin
                amount={conversionRate}
                size={16}
                fontSize={16}
                color={theme.colors.textOfMdt}
              />
            </>
          ) : (
            <>
              <MDTCoin
                amount={1}
                size={16}
                fontSize={16}
                color={theme.colors.textOfMdt}
              />
              <AppText variant="body2" style={almostEqualSymbol(theme)}>
                ≈
              </AppText>
              <MRPCoin
                amount={conversionRate}
                size={16}
                fontSize={16}
                color={theme.colors.textOfMrp}
              />
            </>
          )}
        </ConversionRateRightContainer>
      </RowContainer>
    </>
  );
};

const ConvertForm = ({conversionRate, from}) => {
  const theme = useTheme();
  const {values, setFieldValue, handleSubmit, isValid} = useFormikContext();
  const [isAmountFocus, setIsAmountFocus] = useState(false);
  const [toAmount, setToAmount] = useState(0);
  const [clientError, setClientError] = useState('');
  const isMrp = from === MEASURABLE_REWARD_POINT;
  const FromAmountText = isMrp ? 'RewardPoint' : 'Measurable Data Token';
  const ToAmountText =
    FromAmountText === 'RewardPoint' ? 'Measurable Data Token' : 'RewardPoint';

  useEffect(() => {
    setToAmount(values.amount * conversionRate);
  }, [conversionRate, values]);

  const handleOnBlur = () => {
    setIsAmountFocus(false);
  };

  const handleConverterOnChange = useCallback(
    amount => {
      setFieldValue('amount', amount);
    },
    [setFieldValue],
  );

  const handleError = useCallback(error => {
    setClientError(error);
  }, []);

  return (
    <>
      <ConversionRate conversionRate={conversionRate} isMrp={isMrp} />
      <ConvertersContainer>
        <ConverterContainer
          onBlur={handleOnBlur}
          onFocus={() => setIsAmountFocus(true)}
          isFocus={isAmountFocus}>
          <AppText variant="value" style={converterType(theme, isAmountFocus)}>
            {FromAmountText}
          </AppText>
          <ConverterInput
            keyboardType="numeric"
            name="amount"
            inputAccessoryViewID={inputAccessoryViewID}
            editable={true}
            handleError={handleError}
          />
          <KeyboardButtons
            handleConverterOnChange={handleConverterOnChange}
            from={from}
          />
        </ConverterContainer>
        <Margin />
        <ConvertIcon fill="#21CEDB" style={styles.convertIcon} />
        <ConverterContainer isFocus={false}>
          <AppText variant="value" style={converterType(theme)}>
            {ToAmountText}
          </AppText>
          <AppText variant="heading1" style={numberText(theme)}>
            <FormattedNumber value={toAmount} />
          </AppText>
        </ConverterContainer>
      </ConvertersContainer>
      {!!clientError && (
        <AppText variant="label" style={errorText(theme)}>
          {clientError}
        </AppText>
      )}
      <ThemeButton onPress={handleSubmit} disabled={!isValid}>
        <FormattedMessage id="convert" defaultMessage="convert" />
      </ThemeButton>
    </>
  );
};

export default ConvertForm;
