import {css} from '@emotion/native';

export const text = (theme, variant) => css`
  font-family: ${theme.fonts[variant]};
  font-size: ${String(theme.fontSizes[variant])}px;
  font-weight: ${String(theme.fontWeights[variant])};
  line-height: ${String(theme.lineHeights[variant])}px;

  ${variant === 'pageTitle' &&
    `
    text-transform: uppercase;
  `};
  ${variant === 'button' &&
    'text-transform: uppercase; letter-spacing: 1.5px;'};
  ${variant === 'label' && 'text-transform: uppercase;'};
  ${variant === 'overline' && 'text-transform: uppercase;'};
  ${variant === 'initials1' && 'text-transform: uppercase;'};
  ${variant === 'initials2' && 'text-transform: uppercase;'};
  ${variant === 'initials3' && 'text-transform: uppercase;'};
`;
