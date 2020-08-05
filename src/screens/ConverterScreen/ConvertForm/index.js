import React, {useState, useEffect} from 'react';
import {
  FormattedMessage,
  FormattedTime,
  FormattedNumber,
  useIntl,
} from 'react-intl';
import {InputAccessoryView} from 'react-native';
import {useFormikContext, useField} from 'formik';
import {MEASURABLE_REWARD_POINT} from '@/constants/currency';

import {
  RowContainer,
  ConversionRateText,
  ConversionUpdateDate,
  ConversionRateLeftContainer,
  ConversionRateRightContainer,
  AlmostEqualSymbol,
  ConvertersContainer,
  ConverterContainer,
  ConverterType,
  Input,
  Margin,
  InputAccessoryViewContainer,
  InputAccessoryButton,
  InputAccessoryButtonText,
  NumberText,
  styles,
} from './style';

import ThemeButton from '@/components/ThemeButton';
import MDTCoin from '@/components/MDTCoin';
import MRPCoin from '@/components/MRPCoin';

import ConvertIcon from '@/assets/convert.svg';

const inputAccessoryViewID = 'converterButtons';

const KeyboardButtons = ({handleConverterOnChange}) => (
  <InputAccessoryView nativeID={inputAccessoryViewID}>
    <InputAccessoryViewContainer>
      <InputAccessoryButton onPress={() => handleConverterOnChange(0)}>
        <InputAccessoryButtonText>
          <FormattedMessage id="clear" defaultMessage="clear" />
        </InputAccessoryButtonText>
      </InputAccessoryButton>
      <InputAccessoryButton onPress={() => handleConverterOnChange(6666666)}>
        <InputAccessoryButtonText>
          <FormattedMessage id="convert_all" defaultMessage="Convert all" />
        </InputAccessoryButtonText>
      </InputAccessoryButton>
    </InputAccessoryViewContainer>
  </InputAccessoryView>
);

const ConverterInput = ({title, name, ...props}) => {
  const intl = useIntl();
  const [field] = useField(name);
  return (
    <Input
      value={intl.formatNumber(field.value)}
      onChangeText={field.onChange(name)}
      {...props}
    />
  );
};

const ConversionRate = ({conversionRate, isMrp}) => (
  <>
    <RowContainer>
      <ConversionRateLeftContainer>
        <ConversionRateText>
          <FormattedMessage
            id="conversion_rate"
            defaultMessage="Conversion Rate"
          />
        </ConversionRateText>
        <ConversionUpdateDate>
          <FormattedMessage
            id="lastupdate_at"
            defaultMessage="Last update at {time}"
            values={{
              time: <FormattedTime value={new Date()} />,
            }}
          />
        </ConversionUpdateDate>
      </ConversionRateLeftContainer>
      <ConversionRateRightContainer>
        {isMrp ? (
          <>
            <MRPCoin
              amount={1}
              size={16}
              fontSize={16}
              color={props => props.theme.colors.secondary.superDark}
            />
            <AlmostEqualSymbol>≈</AlmostEqualSymbol>
            <MDTCoin
              amount={conversionRate}
              size={16}
              fontSize={16}
              color={props => props.theme.colors.primary.dark}
            />
          </>
        ) : (
          <>
            <MDTCoin
              amount={1}
              size={16}
              fontSize={16}
              color={props => props.theme.colors.primary.dark}
            />
            <AlmostEqualSymbol>≈</AlmostEqualSymbol>
            <MRPCoin
              amount={conversionRate}
              size={16}
              fontSize={16}
              color={props => props.theme.colors.secondary.superDark}
            />
          </>
        )}
      </ConversionRateRightContainer>
    </RowContainer>
  </>
);

const ConvertForm = ({conversionRate, from}) => {
  const {values, setFieldValue, handleSubmit, isValid} = useFormikContext();
  const [isAmountFocus, setIsAmountFocus] = useState(false);
  const [toAmount, setToAmount] = useState(0);
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

  const handleConverterOnChange = amount => {
    setFieldValue('amount', amount);
  };

  return (
    <>
      <ConversionRate conversionRate={conversionRate} isMrp={isMrp} />
      <ConvertersContainer>
        <ConverterContainer
          onBlur={handleOnBlur}
          onFocus={() => setIsAmountFocus(true)}
          isFocus={isAmountFocus}>
          <ConverterType isFocus={isAmountFocus}>
            {FromAmountText}
          </ConverterType>
          <ConverterInput
            keyboardType="numeric"
            name="amount"
            inputAccessoryViewID={inputAccessoryViewID}
            editable={true}
          />
          <KeyboardButtons handleConverterOnChange={handleConverterOnChange} />
        </ConverterContainer>
        <Margin />
        <ConvertIcon fill="#21CEDB" style={styles.convertIcon} />
        <ConverterContainer isFocus={false}>
          <ConverterType>{ToAmountText}</ConverterType>
          <NumberText>
            <FormattedNumber value={toAmount} />
          </NumberText>
        </ConverterContainer>
      </ConvertersContainer>
      <ThemeButton onPress={handleSubmit} disabled={!isValid}>
        <FormattedMessage id="convert" defaultMessage="convert" />
      </ThemeButton>
    </>
  );
};

export default ConvertForm;
