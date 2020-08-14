import {css} from '@emotion/native';

export const container = css`
  padding-left: 24px;
  padding-right: 24px;
  flex: 1;
  justify-content: center;
`;

export const titleStyle = theme => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 16px;
  text-align: center;
`;

export const detailStyle = theme => css`
  color: ${theme.colors.secondary.normal};
  text-align: center;
`;
