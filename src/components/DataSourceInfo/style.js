import {css} from '@emotion/native';

export const container = css`
  flex: 1;
`;

export const screenStyle = (theme) => css`
  padding-bottom: ${String(theme.space.marginBetweenContentAndScreenBottom)}px;
`;
