import {css} from '@emotion/native';

export const button = css`
  margin-top: 24px;
  align-self: center;
`;

export const detail = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const modal = css`
  padding: 24px;
`;
