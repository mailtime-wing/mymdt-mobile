import {css} from '@emotion/native';

export const gotRewardText = (theme) => css`
  color: ${theme.colors.secondary.dark};
  text-align: center;
`;

export const readyContainer = css`
  flex: 1;
  align-content: center;
  justify-content: center;
`;

export const openContainer = css`
  flex: 1;
`;

export const inner = (theme) => css`
  padding-horizontal: 24px;
  margin-bottom: ${String(theme.space.marginBetweenContentAndScreenBottom)}px;
`;

export const giftContainer = css`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const textContainer = css`
  margin-top: 30px;
  align-self: center;
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
