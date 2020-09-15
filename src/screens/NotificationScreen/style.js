import {css} from '@emotion/native';

export const detailStyle = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  text-align: left;
`;

export const subjectStyle = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const container = css`
  padding-vertical: 16px;
  padding-horizontal: 24px;
`;

export const divider = theme => css`
  height: 1px;
  background-color: ${theme.colors.background2};
  margin-left: 24px;
`;
