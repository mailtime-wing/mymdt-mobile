import {css} from '@emotion/native';

export const container = css`
  padding-bottom: 24px;
  align-items: center;
`;

export const scrollContainer = (theme) => css`
  background: ${theme.colors.themeBackground};
  padding-left: 24px;
  padding-right: 24px;
`;

export const detail = (theme) => css`
  color: ${theme.colors.textOnThemeBackground.mediumEmphasis};
  margin-bottom: 24px;
`;

export const titleStyle = (theme) => css`
  color: ${theme.colors.buttonContrastTextColor};
  margin-bottom: 4px;
`;

export const button = css`
  align-self: stretch;
  margin-bottom: 16px;
`;

export const boxContainer = css`
  border-radius: 24px;
  padding-horizontal: 24px;
  padding-vertical: 52px;
  align-items: center;
`;

export const image = css`
  margin-bottom: 16px;
`;

export const boxLevel = (theme) => css`
  margin-bottom: 8px;
`;

export const boxTitle = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const boxDetail = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;
