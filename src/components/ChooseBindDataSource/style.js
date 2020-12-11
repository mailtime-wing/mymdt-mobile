import {css} from '@emotion/native';

export const bodyContainer = css`
  padding-horizontal: 24px;
`;

export const backgroundImage = css`
  align-self: center;
  margin-bottom: 16px;
`;

export const titleStyle = (theme) => css`
  color: ${theme.colors.textOnThemeBackground.highEmphasis};
  text-align: center;
  margin-bottom: 16px;
`;

export const detailStyle = (theme) => css`
  color: ${theme.colors.textOnThemeBackground.mediumEmphasis};
  text-align: center;
  margin-bottom: 16px;
`;

export const scale = css`
  height: 178px;
`;
