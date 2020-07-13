import styled from '@emotion/native';
import {Platform} from 'react-native';
import TitleText from '@/components/TitleText';

import {MARGIN_BETWEEN_TOP_BAR_AND_TITLE} from '@/constants/layout';

export const Container = styled.View`
  padding-top: ${String(MARGIN_BETWEEN_TOP_BAR_AND_TITLE)}px;
`;

export const Title = styled(TitleText)`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-left: 24px;
  ${Platform.OS === 'ios' && 'font-weight: bold;'}
`;
