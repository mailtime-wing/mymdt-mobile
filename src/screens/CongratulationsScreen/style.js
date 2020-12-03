import {css} from '@emotion/native';

export const container = css`
  flex: 1;
`;

export const contentContaienr = css`
  margin-top: auto;
  margin-bottom: auto;
`;

export const congrats = (theme) => css`
  color: ${theme.colors.secondary.normal};
  margin-top: 41px;
  text-align: center;
`;

export const earnedReward = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  margin-top: 8px;
  margin-bottom: 24px;
  text-align: center;
`;

export const button = css`
  align-self: center;
`;
