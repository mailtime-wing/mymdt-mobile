import styled from '@emotion/native';
import Text from '@/components/AppText';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CoinImage = styled.Image`
  width: ${props => (props.size ? `${props.size}px` : '18px')};
  height: ${props => (props.size ? `${props.size}px` : '18px')};
  margin-right: 2px;
`;

export const AmountText = styled(Text)`
  color: ${props =>
    props.color ? props.color : props.theme.colors.contrastColor};
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '16px')};
  font-weight: bold;
`;
