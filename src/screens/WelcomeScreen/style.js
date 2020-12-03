import {css} from '@emotion/native';

export const container = css`
  flex: 1;
`;

export const contentContaienr = css`
  margin-top: auto;
  margin-bottom: auto;
`;

export const welcome = (theme) => css`
  color: ${theme.colors.secondary.normal};
  margin-top: 41px;
  text-align: center;
`;
