import styled from '@emotion/native';
import TitleText from '@/components/TitleText';
import Text from '@/components/AppText';
import {Platform} from 'react-native';

export const ScrollContainer = styled.ScrollView``;

export const Card = styled.View`
  width: 260px;
  height: 164px;
  border-radius: 16px;
  background-color: ${props => props.background};
  padding: 16px;
`;

export const CardName = styled(TitleText)`
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.theme.colors.white.normal};
  ${Platform.OS === 'ios' && 'font-weight: 500;'}
`;
export const AroundInUSD = styled(Text)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  line-height: 18px;
  text-align: right;
  ${Platform.OS === 'ios' && 'font-weight: 500;'}
`;

export const SliderContainer = styled.View`
  padding: 24px 0;
`;