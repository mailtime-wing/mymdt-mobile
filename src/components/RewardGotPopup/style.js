import {css} from '@emotion/native';

export const gotRewardText = css`
  text-align: center;
  margin-bottom: 8px;
`;

export const convertedText = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  align-items: center;
`;

export const convertedContainer = css`
  flex-direction: row;
  align-self: center;
  margin-top: 8px;
`;

export const centered = css`
  align-self: center;
`;
