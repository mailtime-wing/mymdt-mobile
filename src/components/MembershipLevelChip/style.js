import {css} from '@emotion/native';

export const levelChip = backgroundColor => css`
  padding: 0 8px;
  border-radius: 34px;
  height: 16px;
  background: ${backgroundColor};
  width: auto;
`;

export const levelText = textColor => css`
  color: ${textColor};
`;
