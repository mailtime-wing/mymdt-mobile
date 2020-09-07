import {css} from '@emotion/native';

export const container = (sizeVariant, backgroundColor) => css`
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background: ${backgroundColor};
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

export const icon = (sizeVariant, color) => css`
  ${`
    fill: ${color};
    stroke: ${color};
    stroke-width: 2px;
  `}
  ${sizeVariant === 'small' &&
    `
    width: 18px;
    height: 18px;
  `}
  ${sizeVariant === 'normal' &&
    `
    width: 24px;
    height: 24px;
  `}
  ${sizeVariant === 'large' &&
    `
    width: 40px;
    height: 40px;
  `}
`;
