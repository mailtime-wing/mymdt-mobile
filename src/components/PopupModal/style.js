import {css} from '@emotion/native';

export const titleStyle = theme => css`
  color: ${theme.colors.contrastColor};
`;

export const detailStyle = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const buttonsContainer = css`
  flex-direction: row;
  align-self: center;
`;

export const marginRight = css`
  margin-right: 8px;
`;

export const modalPadding = css`
  padding: 24px;
`;
