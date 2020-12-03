import {css} from '@emotion/native';

export const container = css`
  flex: 1;
`;

export const inner = css`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 24px;
`;

export const formBody = css`
  padding-horizontal: 24px;
`;

export const detailStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const input = css`
  margin-top: 24px;
`;
