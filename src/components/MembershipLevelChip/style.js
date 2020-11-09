import {css} from '@emotion/native';

export const levelChip = (backgroundColor) => css`
  padding: 0 8px;
  border-radius: 34px;
  background: ${backgroundColor};
`;

export const border = (borderColor) => css`
  border: 1px solid ${borderColor};
`;
