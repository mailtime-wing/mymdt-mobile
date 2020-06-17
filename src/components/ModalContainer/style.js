import styled from '@emotion/native';
import {Platform} from 'react-native';
import TitleText from '@/components/TitleText';

export const Container = styled.View`
  padding-top: 88px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: ${props => props.theme.colors.white.normal};
  height: 100%;
`;

export const ScrollContainer = styled.ScrollView`
  background-color: ${props => props.theme.colors.white.normal};
`;

export const Title = styled(TitleText)`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 1px;
  margin-bottom: 16px;
  text-transform: uppercase;
  padding-left: 24px;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
`;
