import {css} from '@emotion/native';

export const container = (theme, variant, sizeVariant) => css`
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${variant === 'filled' &&
    `
    background-color: ${theme.colors.secondary.normal};
  `}
  ${variant === 'outlined' &&
    `
    border-color: ${theme.colors.secondary.border};
    border-width: 1px;
    background-color: ${theme.colors.background1};
  `}
  ${variant === 'contrast_outlined' &&
    `
    border-color: ${theme.colors.buttonContrastBorderColor};
    border-width: 1px;
    background-color: transparent;
  `}
  ${variant === 'transparent' &&
    `
    background-color: ${theme.colors.background1};
  `}
  ${sizeVariant === 'compact' &&
    `
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 8px;
    padding-right: 8px;
    `}
  ${sizeVariant === 'normal' &&
    `
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 12px;
    padding-right: 12px;
    `}
  ${sizeVariant === 'large' &&
    `
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  `}
`;

export const textButton = (theme, variant) => css`
  ${variant === 'filled' &&
    `
    color: ${theme.colors.background1};
  `}
  ${variant === 'outlined' &&
    `
    color: ${theme.colors.secondary.normal};
  `}
  ${variant === 'contrast_outlined' &&
    `
    color: ${theme.colors.buttonContrastTextColor};
  `}
  ${variant === 'transparent' &&
    `
    color: ${theme.colors.secondary.normal};
  `}
`;
