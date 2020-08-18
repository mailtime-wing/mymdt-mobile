import {css} from '@emotion/native';

import {MARGIN_BETWEEN_TOP_BAR_AND_TITLE} from '@/constants/layout';

export const container = css`
  padding-top: ${String(MARGIN_BETWEEN_TOP_BAR_AND_TITLE)}px;
`;

export const titleStyle = theme => css`
  color: ${theme.colors.secondary.normal};
  padding-left: 24px;
`;
