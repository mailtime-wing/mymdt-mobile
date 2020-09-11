import {css} from '@emotion/native';

export const image = sizeVariant => css`
  border-radius: 36px;
  ${sizeVariant === 'small' &&
    `
    width: 40px;
    height: 40px;
    `}
  ${sizeVariant === 'normal' &&
    `
    width: 56px;
    height: 56px;
    `}
  ${sizeVariant === 'large' &&
    `
    width: 72px;
    height: 72px;
  `}
`;
