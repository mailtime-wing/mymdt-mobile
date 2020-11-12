import {css} from '@emotion/native';

export const header = (theme) => css`
  text-align: center;
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 16px;
`;

export const exchangesName = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  flex-grow: 1;
`;

export const referralLink = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const referral = css`
  flex-direction: row;
  align-items: center;
`;

export const rowContainer = css`
  flex-direction: row;
  align-items: center;
  padding-vertical: 8px;
`;

export const exchangesImage = css`
  margin-right: 16px;
`;
