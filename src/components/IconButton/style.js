import {css} from '@emotion/native';
import {transparentize} from 'polished';

export const container = (theme, variant, sizeVariant, color) => css`
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  ${variant === 'filled' &&
    `
    background-color: ${color};
  `}
  ${variant === 'outlined' &&
    `
    border-color: ${transparentize(0.8, color)};
    border-width: 1px;
    background-color: ${theme.colors.background1};
  `}
  ${variant === 'transparent' &&
    `
    background-color: ${theme.colors.background1};
  `}
  ${sizeVariant === 'small' &&
    `
    width: 36px;
    height: 36px;
  `}
  ${sizeVariant === 'normal' &&
    `
    width: 40px;
    height: 40px;
  `}
`;

export const icon = (theme, variant, sizeVariant, color) => css`
  ${variant === 'filled' &&
    `
    fill: ${theme.colors.background1};
    stroke: ${theme.colors.background1};
  `}
  ${variant === 'outlined' &&
    `
    fill: ${color};
    stroke: ${color};
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
`;
