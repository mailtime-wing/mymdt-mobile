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
  ${variant === 'moreCompactButton' &&
  'text-transform: uppercase; letter-spacing: 1.5px;'};
  ${variant === 'smallText' && 'letter-spacing: 0px;'};
  ${variant === 'label' && 'text-transform: uppercase;'};
  ${variant === 'overline' && 'text-transform: uppercase;'};
  ${variant === 'initials1' && 'text-transform: uppercase;'};
  ${variant === 'initials2' && 'text-transform: uppercase;'};
  ${variant === 'initials3' && 'text-transform: uppercase;'};
  ${variant === 'digit12mono' && 'font-variant: tabular-nums;'};
  ${variant === 'digit16mono' && 'font-variant: tabular-nums;'};
  ${variant === 'digit36' && 'font-variant: proportional-nums;'};
  ${variant === 'digit36mono' && 'font-variant: tabular-nums;'};
`;
