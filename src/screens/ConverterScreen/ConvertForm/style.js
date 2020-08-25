import styled from '@emotion/native';
import {Platform, StyleSheet} from 'react-native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

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

export const AlmostEqualSymbol = styled(Text)`
  font-size: 14px;
  line-height: 18px;
  margin: 0 4px;
  color: ${props => props.theme.colors.textOnBackground.disabled};
`;

export const ConversionRateText = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
`;

export const ConversionUpdateDate = styled(Text)`
  font-size: 12px;
  line-height: 18px;
  color: ${props => props.theme.colors.textOnBackground.disabled};
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

export const ConverterType = styled(TitleText)`
  font-size: 16px;
  line-height: 19px;
  ${Platform.OS === 'ios' && 'font-weight: 500;'};
  color: ${props =>
    props.isFocus
      ? props.theme.colors.secondary.dark
      : props.theme.colors.textOnBackground.disabled};
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

export const NumberText = styled(Text)`
  font-size: 36px;
  line-height: 44px;
  flex: 1;
  text-align: right;
  color: ${props =>
    props.editable
      ? props.theme.colors.contrastColor
      : props.theme.colors.textOnBackground.disabled};
`;

export const Error = styled(Text)`
  font-size: 12px;
  height: 16px;
  color: ${props => props.theme.colors.textOnError.light};
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

export const InputAccessoryButtonText = styled(Text)`
  font-size: 14px;
  line-height: 17px;
  ${Platform.OS === 'ios' && 'font-weight: 600;'};
  text-align: center;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.secondary.dark};
`;

export const styles = StyleSheet.create({
  convertIcon: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
  },
});
