import styled from '@emotion/native';
import Text from '@/components/AppText';

export const OptionHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  ${props => props.active && 'background: rgba(33, 206, 219, 0.1);'}
  border: 1px solid ${props => props.theme.colors.background2};
`;

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 48px;
  ${props => props.active && 'background: rgba(33, 206, 219, 0.1);'}
`;

export const HeaderLabel = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
  ${props => props.active && `color: ${props.theme.colors.secondary.dark};`}
`;

export const Label = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
  ${props => props.active && `color: ${props.theme.colors.secondary.dark};`}
  margin-left: 16px;
`;

export const RightSide = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OptionsContainer = styled.View`
  height: ${props => (props.expand ? 'auto' : '0')};
  overflow: hidden;
`;
