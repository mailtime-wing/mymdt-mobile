import {css} from '@emotion/native';

export const container = css`
  flex: 1;
`;

export const textContainer = css`
  padding-horizontal: 28;
  padding-vertical: 40;
  align-items: center;
`;

export const header = (theme) => css`
  color: ${theme.colors.secondary.normal};
`;

export const description = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;
