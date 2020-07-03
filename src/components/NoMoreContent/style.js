import styled from '@emotion/native';
import {Platform} from 'react-native';
import TitleText from '@/components/TitleText';

export const MoreToComeText = styled(TitleText)`
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.theme.colors.secondary.dark};
  ${Platform.OS === 'ios' && 'font-weight: 500;'}
  text-align: center;
  padding-top: 48px;
  padding-bottom: 48px;
`;
