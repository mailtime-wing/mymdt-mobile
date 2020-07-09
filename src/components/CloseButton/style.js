import styled from '@emotion/native';
import {
  MARGIN_BETWEEN_TOP_BAR_AND_TITLE,
  TOP_BAR_HEIGHT,
} from '@/constants/layout';

export const ButtonContainer = styled.TouchableOpacity``;

// Since we cannot control the position of headerLeft in react-navigation's Header
// we use margin-top to adjust. It is kind of hack
// TODO: Re-visit if react-navigation has supported it
export const Icon = styled.Image`
  margin-top: ${String(MARGIN_BETWEEN_TOP_BAR_AND_TITLE)}px;
  margin-left: 24px;
  height: ${String(TOP_BAR_HEIGHT)}px;
`;
