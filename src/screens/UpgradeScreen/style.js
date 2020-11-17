import {css} from '@emotion/native';

export const container = css`
  margin-top: auto;
  margin-bottom: auto;
  align-self: center;
`;

export const congrats = (theme) => css`
  color: ${theme.colors.secondary.normal};
  text-align: center;
`;

export const member = (theme) => css`
  color: ${theme.colors.background1};
  text-align: center;
`;

export const button = css`
  align-self: center;
  margin-top: 40px;
`;
