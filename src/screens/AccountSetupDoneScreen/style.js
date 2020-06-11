import styled from '@emotion/native';
import {Platform} from 'react-native';
import TitleText from '@/components/TitleText';

export const ScrollContainer = styled.ScrollView``;

export const Container = styled.TouchableOpacity`
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 50%;
  flex: 1;
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

export const Detail = styled(TitleText)`
  font-size: 18px;
  color: ${props => props.theme.colors.secondary.normal};
  text-align: center;
`;

export const MarginContainer = styled.View`
  margin-top: 16px;
`;
