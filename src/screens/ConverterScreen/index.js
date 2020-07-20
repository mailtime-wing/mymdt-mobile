import React, {useState, useEffect} from 'react';
import {FormattedMessage, FormattedTime} from 'react-intl';
import {
  InputAccessoryView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Formik, useFormikContext, useField} from 'formik';

import {
  Container,
  Detail,
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
  styles,
} from './style';

import ModalContainer from '@/components/ModalContainer';
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
  const [field] = useField(name);
  return (
    <Input
      value={Number(field.value).toString()}
      onChangeText={field.onChange(name)}
      {...props}
    />
  );
};

const ConverterForm = ({conversionRate}) => {
  const {values, setFieldValue, handleSubmit, isValid} = useFormikContext();
  const [isMRPFocus, setIsMRPFocus] = useState(false);

  useEffect(() => {
    setFieldValue('mdtAmount', values.mrpAmount * conversionRate);
  }, [conversionRate, setFieldValue, values]);

  const handleOnBlur = () => {
    setIsMRPFocus(false);
  };

  const handleConverterOnChange = amount => {
    setFieldValue('mrpAmount', amount);
  };

  return (
    <>
      <ConvertersContainer>
        <ConverterContainer
          onBlur={handleOnBlur}
          onFocus={() => setIsMRPFocus(true)}
          isFocus={isMRPFocus}>
          <ConverterType isFocus={isMRPFocus}>RewardPoint</ConverterType>
          <ConverterInput
            keyboardType="numeric"
            name="mrpAmount"
            inputAccessoryViewID={inputAccessoryViewID}
            editable={true}
          />
          <KeyboardButtons handleConverterOnChange={handleConverterOnChange} />
        </ConverterContainer>
        <Margin />
        <ConvertIcon fill="#21CEDB" style={styles.convertIcon} />
        <ConverterContainer isFocus={false}>
          <ConverterType>Measurable Data Token</ConverterType>
          <ConverterInput
            keyboardType="numeric"
            name="mdtAmount"
            editable={false}
          />
        </ConverterContainer>
      </ConvertersContainer>
      <ThemeButton onPress={handleSubmit} disabled={!isValid}>
        <FormattedMessage id="convert" defaultMessage="convert" />
      </ThemeButton>
    </>
  );
};

const ConverterScreen = () => {
  const conversionRate = 1.5; // TODO: get from api

  const handleConvertPress = async values => {
    // TODO: integrate convert api
  };

  const validate = values => {
    const errors = {};
    // TODO: handle when integrate convert api

    return errors;
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView behavior="position">
        <ModalContainer
          title={
            <FormattedMessage id="converter" defaultMessage="Converter" />
          }>
          <Container>
            <Detail>
              <FormattedMessage
                id="converter_detail"
                defaultMessage="converter_detail"
              />
            </Detail>
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
              </ConversionRateRightContainer>
            </RowContainer>
            <Formik
              initialValues={{
                mrpAmount: 0,
                mdtAmount: 0,
                conversionRate: conversionRate,
              }}
              onSubmit={handleConvertPress}
              validate={validate}>
              <ConverterForm conversionRate={conversionRate} />
            </Formik>
          </Container>
        </ModalContainer>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ConverterScreen;
