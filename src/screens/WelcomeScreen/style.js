import styled from '@emotion/native';
import {Platform} from 'react-native';
import Text from '@/components/AppText';
import TitleText from '@/components/TitleText';

export const Container = styled.View`
  padding-top: 120px;
  padding-bottom: 24px;
`;

export const ScrollContainer = styled.ScrollView``;

export const Title = styled(TitleText)`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 1px;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
  margin-bottom: 29px;
  text-transform: uppercase;
  padding-left: 24px;
  padding-right: 24px;
`;

export const Detail = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  padding-left: 24px;
  padding-right: 24px;
  color: ${props => props.theme.colors.black.light};
`;

export const StartAndAgree = styled(Text)`
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  color: ${props => props.theme.colors.grey.dark};
  margin-top: 11px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const PaddingContainer = styled.View`
  padding-left: 24px;
  padding-right: 24px;
`;

export const AppIconGridImageContainer = styled.View`
  margin-top: 48px;
  margin-bottom: 48px;
`;

export const AppIconGridImage = styled.Image``;
