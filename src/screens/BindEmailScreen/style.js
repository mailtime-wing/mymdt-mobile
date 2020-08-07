import styled from '@emotion/native';
import {Platform} from 'react-native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const ScrollContainer = styled.ScrollView`
  padding-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const Title = styled(TitleText)`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  /* line-height: 36px; */
  letter-spacing: 1px;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
  margin-bottom: 24px;
  text-transform: uppercase;
`;

export const Detail = styled(Text)`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 1px;
  margin-bottom: 48px;
`;
