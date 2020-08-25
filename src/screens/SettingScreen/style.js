import styled from '@emotion/native';
import {Platform} from 'react-native';
import Text from '@/components/AppText';

export const Container = styled.View`
  padding: 0 24px;
`;

export const ScrollContainer = styled.ScrollView``;

export const ListHeader = styled(Text)`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.textOnBackground.disabled};
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
  padding: 16px 0;
  margin-top: 24px;
`;
