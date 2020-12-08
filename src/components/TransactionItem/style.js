import {css} from '@emotion/native';

export const transaction = css`
  flex: 1;
  margin-right: 16px;
  justify-content: center;
  padding-vertical: 12px;
`;

export const container = css`
  flex-direction: row;
`;

export const nameStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const dateStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const border = (theme, hideDivider) => css`
  border-bottom-width: 1px;
  border-bottom-color: ${hideDivider
    ? 'transparent'
    : theme.colors.background2};
  margin-left: 16px;
  padding-right: 16px;
  flex-grow: 1;
  flex-direction: row;
`;

export const iconContainer = css`
  align-self: center;
`;
