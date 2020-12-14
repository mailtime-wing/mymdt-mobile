import {css} from '@emotion/native';

export const iconContainer = (theme, sizeVariant) => css`
  border: 1px solid ${theme.colors.background3};
  ${sizeVariant === 'normal' &&
  `
    border-radius: 10px;
  `}
  ${sizeVariant === 'large' &&
  `
    border-radius: 16px;
  `}
`;

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
