import styled from '@emotion/native';
import Text from '@/components/AppText';
import {MEASURABLE_DATA_TOKEN} from '@/constants/currency';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const CoinImage = styled.Image`
  width: ${props => (props.size ? `${props.size}px` : '18px')};
  height: ${props => (props.size ? `${props.size}px` : '18px')};
  margin-right: 2px;
`;

export const AmountText = styled(Text)`
  color: ${props =>
    props.type === MEASURABLE_DATA_TOKEN ? '#0036C5' : '#1E7884'};
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '16px')};
  font-weight: bold;
`;
