import styled from '@emotion/native';
import {Platform} from 'react-native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const Container = styled.View`
  padding: 340px 24px 0px 24px;
`;

export const Title = styled(TitleText)`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 1px;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
  margin-bottom: 16px;
  text-transform: uppercase;
  text-align: center;
`;

export const Detail = styled(Text)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 242px;
`;

export const MarginContainer = styled.View`
  margin-top: 16px;
`;
