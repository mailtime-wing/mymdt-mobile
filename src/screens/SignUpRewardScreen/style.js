import {css} from '@emotion/native';

export const gotRewardText = (theme) => css`
  color: ${theme.colors.secondary.dark};
  text-align: center;
`;

export const giftIcon = css`
  width: 145px;
  height: 174px;
  align-self: center;
  margin-top: 64px;
  margin-bottom: 64px;
`;

export const readyContainer = css`
  flex: 1;
  align-content: center;
  justify-content: center;
`;

export const openContainer = css`
  flex: 1;
  margin-top: 100px;
`;

export const inner = css`
  justify-content: space-between;
  flex: 1;
  padding-horizontal: 24px;
  padding-bottom: 24px;
`;

export const textContainer = css`
  margin-top: 30px;
  align-self: center;
`;
