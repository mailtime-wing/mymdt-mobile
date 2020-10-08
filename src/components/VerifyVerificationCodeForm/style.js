import {css} from '@emotion/native';

export const container = css`
  padding-horizontal: 24px;
  padding-bottom: 24px;
`;

export const titleStyle = (theme) => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 24px;
`;

export const detailStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const formContainer = css`
  margin-vertical: 24px;
`;

export const button = css`
  margin-top: 24px;
`;
