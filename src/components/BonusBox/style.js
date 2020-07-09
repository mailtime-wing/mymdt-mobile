import styled from '@emotion/native';
import {Platform} from 'react-native';
import TitleText from '@/components/TitleText';
import Text from '@/components/AppText';

export const Container = styled.View`
  background: ${props => props.theme.colors.white.normal};
  border-radius: 24px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  padding: 24px;
`;

export const HeaderRightContainer = styled.View`
  flex: 6;
`;

export const Title = styled(TitleText)`
  font-size: 24px;
  line-height: 29px;
  color: rgba(0, 0, 0, 0.8);
  ${Platform.OS === 'ios' && 'font-weight: 500;'}
`;

export const Detail = styled(Text)`
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.colors.black.superLight};
`;

export const Icon = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 16px;
`;
