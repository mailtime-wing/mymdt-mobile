import styled, {css} from '@emotion/native';
import {Platform} from 'react-native';
import TitleText from '@/components/TitleText';
import Text from '@/components/AppText';

export const Container = styled.View`
  margin-bottom: 24px;
`;

export const HorizontalScrollContainer = styled.ScrollView`
  background: transparent;
  padding-bottom: 24px;
`;

export const GotCheckInRewardText = styled(TitleText)`
  font-size: 20px;
  line-height: 24px;
  ${Platform.OS === 'ios' && 'font-weight: 500;'}
  color: ${props =>
    props.color ? props.color : props.theme.colors.contrastColor};
  text-align: center;
  margin-bottom: 8px;
`;

export const CovertedContainer = styled.View`
  flex: row;
`;

export const ConvertedText = styled(Text)`
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.colors.textOnBackground.disabled};
  text-align: center;
`;

export const MarginTop = styled.View`
  margin-top: 16px;
`;

export const MarginLeft = styled.View`
  margin-left: 24px;
`;

export const checkInButton = css`
  width: 30%;
  align-self: center;
`;
