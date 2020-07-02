import styled from '@emotion/native';
import {Platform} from 'react-native';
import TitleText from '@/components/TitleText';
import AppText from '@/components/AppText';
import ScreenContainer from '@/components/ScreenContainer';

export const Container = styled(ScreenContainer)`
  padding-bottom: 24px;
`;

export const ScrollContainer = styled.ScrollView`
  background: ${props => props.theme.colors.secondary.normal};
  padding-left: 24px;
  padding-right: 24px;
`;

export const BackgroundImage = styled.Image`
  align-self: center;
  margin-bottom: 85px;
`;

export const Title = styled(TitleText)`
  font-size: 24px;
  line-height: 29px;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
  color: ${props => props.theme.colors.white.normal};
  text-align: center;
  margin-bottom: 24px;
`;

export const Detail = styled(AppText)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.white.normal};
  text-align: center;
  margin-bottom: 80px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
