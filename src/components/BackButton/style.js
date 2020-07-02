import styled from '@emotion/native';

import Text from '@/components/AppText';
import {
  MARGIN_BETWEEN_STATUS_BAR_AND_TOP_BAR,
  TOP_BAR_HEIGHT,
} from '@/constants/layout';

// Since we cannot control the position of headerLeft in react-navigation's Header
// we use margin-top to adjust. It is kind of hack
// TODO: Re-visit if react-navigation has supported it
export const ButtonContainer = styled.TouchableOpacity`
  margin-top: ${String(MARGIN_BETWEEN_STATUS_BAR_AND_TOP_BAR)}px;
  margin-left: 24px;
  padding: 8px;
  height: ${String(TOP_BAR_HEIGHT)}px;
  border: 1px solid ${props => props.theme.colors.secondary.light};
  border-radius: 24px;
  background: ${props => props.theme.colors.white.normal};
`;

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  font-size: 14px;
  letter-spacing: 1.5px;
  color: ${props => props.theme.colors.secondary.normal};
  font-weight: bold;
  text-transform: uppercase;
`;

export const BackArrowIcon = styled.Image`
  margin-right: 8px;
`;
