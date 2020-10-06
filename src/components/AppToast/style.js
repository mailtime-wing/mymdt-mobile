import {css} from '@emotion/native';

export const container = (theme, variant) => css`
  border-radius: 16px;
  padding: 16px;
  height: 74px;
  align-items: center;
  flex-direction: row;
  ${theme.colors.elevatedBackground4};

  ${variant === 'theme' &&
    `
    background-color: ${theme.colors.secondary.normal};
    `}
  ${variant === 'error' &&
    `
    background-color: ${theme.colors.textOnError.normal};
    `}
`;

export const text = (theme, variant) => css`
  color: ${theme.colors.background1};
  ${variant === 'info' &&
    `
    color: ${theme.colors.textOnBackground.highEmphasis};
    `}
`;

export const xIcon = (theme, variant) => css`
  stroke-width: 2px;
  flex: 1;
  ${`
    fill: ${theme.colors.background1};
    stroke: ${theme.colors.background1};
    `}
  ${variant === 'info' &&
    `
    fill: ${theme.colors.textOnBackground.highEmphasis};
    stroke: ${theme.colors.textOnBackground.highEmphasis};
    `}
`;

export const icon = css`
  margin-right: 8px;
`;

export const test = css`
  flex-grow: 1;
  width: 70%;
`;
