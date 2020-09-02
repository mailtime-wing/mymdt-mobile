import {css} from '@emotion/native';

export const container = css`
  padding-bottom: 24px;
`;

export const scrollContainer = theme => css`
  background: ${theme.colors.themeBackground};
  padding-left: 24px;
  padding-right: 24px;
`;

export const detail = theme => css`
  color: ${theme.colors.textOnThemeBackground.mediumEmphasis};
  margin-bottom: 24px;
`;

export const titleStyle = theme => css`
  color: ${theme.colors.textOnThemeBackground.highEmphasis};
  margin-bottom: 16px;
`;

export const boxContainer = theme => css`
  background: ${theme.colors.background1};
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 16px;
`;

export const boxLevel = theme => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 8px;
  text-align: center;
`;

export const boxTitle = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  margin-bottom: 16px;
  text-align: center;
`;

export const boxDetail = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 24px;
`;
