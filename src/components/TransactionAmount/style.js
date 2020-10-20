import {css} from '@emotion/native';

export const amount = (theme, variant) => css`
  ${variant === 'from' &&
  `
  color: ${theme.colors.textOnError.normal};
  `}
  ${variant === 'to' &&
  `
  color: ${theme.colors.secondary.dark};
  `}
  margin-right: 4px;
`;

export const unit = (theme, variant) => css`
  ${variant === 'from' &&
  `
  color: ${theme.colors.textOnError.normal};
  `}
  ${variant === 'to' &&
  `
  color: ${theme.colors.secondary.dark};
  `}
`;

export const container = css`
  margin: auto 0;
  flex-direction: row;
  align-items: baseline;
`;
