import styled, {css} from '@emotion/native';
import {StyleSheet} from 'react-native';

export const RowContainer = styled.View`
  flex-direction: row;
  padding: 12px 0;
  margin: 24px 0;
  justify-content: space-between;
`;

export const ConversionRateLeftContainer = styled.View`
  flex-direction: column;
`;

export const ConversionRateRightContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const almostEqualSymbol = theme => css`
  margin: 0 4px;
  color: ${theme.colors.textOnBackground.disabled};
`;

export const conversionRateText = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const conversionUpdateDate = theme => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const ConvertersContainer = styled.View`
  justify-content: center;
  margin-bottom: 24px;
`;

export const ConverterContainer = styled.View`
  flex: 1;
  border-radius: 8px;
  padding: 24px;
  border-radius: 24px;
  border: 1px solid ${props => props.theme.colors.background2};
  background-color: transparent;
  ${props =>
    props.isFocus &&
    `border: 2px solid ${props.theme.colors.secondary.normal};
    background-color: ${props.theme.colors.inputFocusBackground};`};
`;

export const converterType = (theme, isFocus) => css`
  color: ${isFocus
    ? theme.colors.secondary.dark
    : theme.colors.textOnBackground.disabled};
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  font-size: 36px;
  line-height: 44px;
  flex: 1;
  text-align: right;
  color: ${props =>
    props.editable
      ? props.theme.colors.contrastColor
      : props.theme.colors.textOnBackground.disabled};
`;

export const numberText = theme => css`
  flex: 1;
  text-align: right;
  color: ${theme.colors.textOnBackground.disabled};
`;

export const Margin = styled.View`
  margin-bottom: 16px;
`;

export const InputAccessoryViewContainer = styled.View`
  background-color: ${props => props.theme.colors.background1};
  flex-direction: row;
  align-items: center;
`;

export const InputAccessoryButton = styled.TouchableOpacity`
  flex: 1;
  padding: 16px 0;
  border: 1px solid ${props => props.theme.colors.background2};
`;

export const inputAccessoryButtonText = theme => css`
  color: ${theme.colors.secondary.dark};
  text-align: center;
`;

export const styles = StyleSheet.create({
  convertIcon: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
  },
});
