import {css} from '@emotion/native';

export const container = css`
  padding: 0 24px;
`;

export const appVersionStyle = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  text-align: center;
  margin-top: 24px;
`;
