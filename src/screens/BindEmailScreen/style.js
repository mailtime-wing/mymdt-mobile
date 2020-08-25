import {css} from '@emotion/native';

export const scrollContainer = css`
  padding-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const detailStyle = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 24px;
`;

export const title = theme => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 24px;
`;
