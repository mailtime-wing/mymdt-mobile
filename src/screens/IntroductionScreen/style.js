import {css} from '@emotion/native';

export const container = (theme) => css`
  flex: 1;
  justify-content: flex-start;
  background: ${theme.colors.themeBackground};
  padding-bottom: 16px;
`;
export const button = css`
  margin-horizontal: 24px;
`;
