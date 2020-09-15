import {css} from '@emotion/native';
import {StyleSheet} from 'react-native';

export const container = sizeVariant => css`
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

export const icon = sizeVariant => css`
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

export const iconContainer = theme => css`
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.secondary.normal};
`;

export const initialsContainer = (theme, colorIndex) => css`
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.avatarsInitials[colorIndex]};
`;

export const initials = theme => css`
  color: ${theme.colors.background1};
`;

export const styles = theme =>
  StyleSheet.create({
    // passing border-related styles to <Image /> using emotion cause warning. Use native StyleSheet instead
    border: {
      borderRadius: 20,
      borderColor: theme.colors.background2,
      borderWidth: 1,
    },
  });
