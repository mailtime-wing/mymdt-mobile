import {css} from '@emotion/native';

export const container = css`
  padding-horizontal: 24px;
`;

export const title = (theme) => css`
  color: ${theme.colors.secondary.normal};
`;

export const detail = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-vertical: 24px;
`;

export const image = css`
  margin-bottom: 40px;
`;
