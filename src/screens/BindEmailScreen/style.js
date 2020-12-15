import {css} from '@emotion/native';

export const container = css`
  flex: 1;
  padding-bottom: 24px;
`;

export const innerContainer = css`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
`;

export const formContainer = css`
  flex: 1;
  justify-content: space-between;
`;

export const detailStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 24px;
`;
