import styled from '@emotion/native';
import {Platform} from 'react-native';
import TitleText from '@/components/TitleText';

export const Container = styled.View`
  margin-top: 16px;
  padding: 85px 30px 30px 30px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: ${props => props.theme.colors.white.normal};
  height: 100%;
`;

export const ScrollContainer = styled.ScrollView`
  background-color: ${props => props.theme.colors.white.normal};
`;

export const Title = styled(TitleText)`
  font-size: 26px;
  line-height: 34px;
  text-transform: uppercase;
  letter-spacing: 1px;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
`;
