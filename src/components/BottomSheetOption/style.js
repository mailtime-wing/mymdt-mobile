import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Option = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  ${props => props.active && 'background: rgba(33, 206, 219, 0.1);'}
`;

export const ListLabel = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
  ${props => props.active && `color: ${props.theme.colors.secondary.dark};`}
`;

export const ListValue = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.black.superLight};
  margin-right: 16px;
`;

export const RightSide = styled.View`
  flex-direction: row;
  align-items: center;
`;
