import {css} from '@emotion/native';
import {StyleSheet} from 'react-native';

export const titleStyle = (theme) => css`
  color: ${theme.colors.contrastColor};
  text-align: center;
  margin-top: 8px;
`;

export const buttonsContainer = css`
  flex-direction: row;
  align-self: center;
`;

export const buttonContainer = css`
  align-self: center;
`;

export const marginRight = css`
  margin-right: 8px;
`;

export const container = css`
  padding-top: 16px;
  padding-bottom: 24px;
  padding-horizontal: 24px;
`;

export const closeButton = css`
  align-self: center;
  position: absolute;
  right: 0;
`;

export const header = css`
  justify-content: center;
  align-items: center;
`;

export const pinMask = (theme) => css`
  width: 12px;
  height: 12px;
  border-radius: 25px;
  background-color: ${theme.colors.contrastColor};
`;

export const pinContainer = css`
  margin-vertical: 24;
`;

export const errorStyle = (theme) => css`
  color: ${theme.colors.textOnError.normal};
  text-align: center;
`;

export const styles = (theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 8,
      width: '100%',
    },
    pinCell: {
      backgroundColor: theme.colors.background2,
      borderRadius: 8,
      width: 40,
      height: 48,
    },
    pinCellFocused: {
      borderWidth: 2,
      borderRadius: 8,
      borderColor: theme.colors.secondary.normal,
      backgroundColor: theme.colors.primary.normal20Opacity,
    },
    pinCellError: {
      borderRadius: 8,
      width: 40,
      height: 48,
      backgroundColor: theme.colors.textOnError.superLight,
    },
  });
