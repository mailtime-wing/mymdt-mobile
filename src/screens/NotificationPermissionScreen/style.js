import styled from '@emotion/native';
import {Platform} from 'react-native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';
import ScreenContainer from '@/components/ScreenContainer';

export const Container = styled(ScreenContainer)`
  margin-top: 68px;
  margin-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const ScrollContainer = styled.ScrollView``;

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
  font-size: 14px;
  line-height: 17px;
  margin-top: 15px;
  margin-bottom: 64px;
  text-align: center;
`;

export const MarginContainer = styled.View`
  margin-top: 16px;
`;

export const NotificationPermission = styled.Image`
  align-self: center;
`;

export const UpArrow = styled.Image`
  margin-left: 60%;
  margin-top: 8px;
  margin-bottom: 72px;
`;
