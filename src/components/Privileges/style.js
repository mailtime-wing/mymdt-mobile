import {css} from '@emotion/native';

export const container = (theme) => css`
  ${theme.colors.elevatedBackgroundMedium};
  padding-vertical: 24px;
  border-bottom-width: 1px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.background2};
`;

export const highEmphasis = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  flex-shrink: 1;
`;

export const disabled = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const privilege = (theme) => css`
  color: ${theme.colors.secondary.normal};
  text-align: center;
`;

export const star = css`
  margin-right: 8px;
`;

export const rowContainer = css`
  flex-direction: row;
  padding-vertical: 8px;
`;
