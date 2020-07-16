import React, {useState} from 'react';
import {FormattedMessage, FormattedTime} from 'react-intl';
import {InputAccessoryView, KeyboardAvoidingView} from 'react-native';

import {
  ScrollContainer,
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
  ConverterInput,
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
      <InputAccessoryButton>
        <InputAccessoryButtonText onPress={() => handleConverterOnChange(0)}>
          Clear
        </InputAccessoryButtonText>
      </InputAccessoryButton>
      <InputAccessoryButton>
        <InputAccessoryButtonText
          onPress={() => handleConverterOnChange(6666666)}>
          Convert all
        </InputAccessoryButtonText>
      </InputAccessoryButton>
    </InputAccessoryViewContainer>
  </InputAccessoryView>
);

const ConverterScreen = () => {
  const [conversionRate] = useState(1.5);
  const [isMRPFocus, setIsMRPFocus] = useState(false);
  const [mrpAmount, setMrpAmount] = useState(0);
  const mdtAmount = mrpAmount * conversionRate;

  const handleOnBlur = () => {
    setIsMRPFocus(false);
  };

  const handleConverterOnChange = amount => {
    setMrpAmount(Number(amount));
  };

  return (
    <ScrollContainer keyboardShouldPersistTaps="handled">
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
            <ConvertersContainer>
              <ConverterContainer
                onBlur={handleOnBlur}
                onFocus={() => setIsMRPFocus(true)}
                isFocus={isMRPFocus}>
                <ConverterType isFocus={isMRPFocus}>RewardPoint</ConverterType>
                <ConverterInput
                  keyboardType="numeric"
                  value={mrpAmount.toString()}
                  onChangeText={handleConverterOnChange}
                  inputAccessoryViewID={inputAccessoryViewID}
                  editable={true}
                />
                <KeyboardButtons
                  handleConverterOnChange={handleConverterOnChange}
                />
              </ConverterContainer>
              <Margin />
              <ConvertIcon fill="#21CEDB" style={styles.convertIcon} />
              <ConverterContainer isFocus={false}>
                <ConverterType>Measurable Data Token</ConverterType>
                <ConverterInput value={mdtAmount.toString()} editable={false} />
              </ConverterContainer>
            </ConvertersContainer>
            <ThemeButton>
              <FormattedMessage id="convert" defaultMessage="convert" />
            </ThemeButton>
          </Container>
        </ModalContainer>
      </KeyboardAvoidingView>
    </ScrollContainer>
  );
};

export default ConverterScreen;
