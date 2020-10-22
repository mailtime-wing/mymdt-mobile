import {css} from '@emotion/native';

export const icon = (sizeVariant) => css`
  ${sizeVariant === 'normal' &&
  `
    border-radius: 10px;
  width: 40px;
  height: 40px;
  `}
  ${sizeVariant === 'large' &&
  `
    border-radius: 16px;
  width: 64px;
  height: 64px;
  `}
`;
