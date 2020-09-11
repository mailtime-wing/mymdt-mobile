import {css} from '@emotion/native';

export const gotRewardText = (theme, color) => css`
  color: ${color ? color : theme.colors.contrastColor};
  text-align: center;
  margin-bottom: 8px;
`;

export const convertedText = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  align-items: center;
`;

export const convertedContainer = css`
  flex-direction: row;
  align-self: center;
  margin-top: 8px;
`;
