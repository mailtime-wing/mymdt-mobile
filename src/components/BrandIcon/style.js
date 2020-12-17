import {css} from '@emotion/native';

export const iconContainer = (theme, sizeVariant) => css`
  border: 1px solid ${theme.colors.background3};
  ${sizeVariant === 'small' &&
  `
    border-radius: 10px;
    width: 40px;
    height: 40px;
  `}
  ${sizeVariant === 'normal' &&
  `
    border-radius: 16px;
  width: 64px;
  height: 64px;
  `}
  ${sizeVariant === 'large' &&
  `
    border-radius: 16px;
  width: 85px;
  height: 85px;
  `}
`;

export const icon = (sizeVariant) => css`
  flex: 1;
  ${sizeVariant === 'small' &&
  `
    border-radius: 10px;
  `}
  ${sizeVariant === 'normal' &&
  `
    border-radius: 16px;
  `}
  ${sizeVariant === 'large' &&
  `
    border-radius: 16px;
  `}
`;
