import {css} from '@emotion/native';

export const rowContainer = css`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 8px;
  align-items: center;
`;

export const rowTextStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;
