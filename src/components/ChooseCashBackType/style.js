import {css} from '@emotion/native';

export const container = (theme) => css`
  flex: 1;
  background: ${theme.colors.themeBackground};
`;

export const innerContainer = (theme) => css`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: ${String(theme.space.marginBetweenContentAndScreenBottom)}px;
`;

export const detail = (theme) => css`
  color: ${theme.colors.textOnThemeBackground.mediumEmphasis};
  margin-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const titleStyle = (theme) => css`
  color: ${theme.colors.buttonContrastTextColor};
  margin-bottom: 4px;
`;

export const separator = css`
  margin-vertical: 8px;
`;

export const button = css`
  flex: 1;
`;

export const boxContainer = css`
  flex: 1;
  border-radius: 24px;
  padding-horizontal: 24px;
  align-items: center;
  justify-content: center;
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
