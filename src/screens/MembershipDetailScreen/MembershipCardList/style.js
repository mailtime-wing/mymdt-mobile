import {css} from '@emotion/native';
import {StyleSheet} from 'react-native';

export const card = css`
  border-radius: 24px;
  margin-horizontal: 24px;
  margin-vertical: 16px;
`;

export const upperSection = (backgroundColor) => css`
  background-color: ${backgroundColor};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

export const tag = (theme) => css`
  background: ${theme.colors.primary.normal};
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
  width: 88px;
  height: 16px;
  padding-left: 24px;
  padding-right: 8px;
  justify-content: center;
`;

export const tagStyle = css`
  margin-top: 60px;
`;

export const margin = css`
  margin-top: 76px; // 60 margin-top + 16 tag height
`;

export const cardContainer = css`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const currentStyle = (theme) => css`
  color: ${theme.colors.background1};
  text-align: center;
`;

export const level = (textColor) => css`
  color: ${textColor};
  text-align: left;
  margin-left: 24px;
  margin-vertical: 8px;
  text-transform: uppercase;
  z-index: 1;
`;

export const privilegeSectionPadding = css`
  padding-horizontal: 24px;
`;

export const upgradeButton = css`
  margin-top: 16px;
`;

export const image = css`
  margin-left: auto;
`;

export const styles = StyleSheet.create({
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  paginationContainer: {
    paddingVertical: 0,
    marginTop: 24,
    marginBottom: 16,
  },
});
