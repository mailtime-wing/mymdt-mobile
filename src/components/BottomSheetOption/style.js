import {css} from '@emotion/native';

export const option = (theme, active) => css`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  ${active && `background: ${theme.colors.secondary.border};`}
`;

export const listLabel = (theme, active) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  ${active && `color: ${theme.colors.secondary.dark};`}
`;

export const listValue = theme => css`
  color: ${theme.colors.textOnBackground.disabled};
  margin-right: 16px;
`;

export const rightSide = css`
  flex-direction: row;
  align-items: center;
`;
