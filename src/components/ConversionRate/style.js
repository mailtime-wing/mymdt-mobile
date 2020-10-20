import {css} from '@emotion/native';

export const almostEqualSymbol = (theme) => css`
  margin: 0 4px;
  color: ${theme.colors.textOnBackground.disabled};
`;

export const container = css`
  flex-direction: row;
  align-items: center;
`;
