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
  ${variant === 'digit12mono' &&
  "font-feature-settings: 'tnum' on, 'lnum' on, 'ss02' on, 'cv01' on, 'cv03' on, 'cv04' on, 'cv02' on;"};
  ${variant === 'digit16mono' &&
  "font-feature-settings: 'tnum' on, 'lnum' on, 'ss02' on, 'cv01' on, 'cv03' on, 'cv04' on, 'cv02' on;"};
  ${variant === 'digit36' &&
  "font-feature-settings: 'pnum' on, 'lnum' on, 'ss02' on, 'cv01' on, 'cv02' on, 'cv03' on, 'cv04' on, 'zero' on;"};
  ${variant === 'digit36mono' &&
  "font-feature-settings: 'tnum' on, 'lnum' on, 'ss02' on, 'cv01' on, 'cv03' on, 'cv04' on, 'cv02' on;"};
`;
