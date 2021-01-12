import {css} from '@emotion/native';

export const header = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const detail = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const modalContainer = (theme) => css`
  padding: 24px;
  ${theme.colors.elevatedBackgroundHigh};
`;

export const button = css`
  align-self: center;
`;
