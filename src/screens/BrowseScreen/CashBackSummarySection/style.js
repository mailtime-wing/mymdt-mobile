import {css} from '@emotion/native';

export const sectionContainer = css``;

export const actionsContainer = css`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const nameStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  text-align: center;
`;

export const shortcut = css`
  flex-basis: 33%;
  align-items: center;
  padding: 8px;
`;

export const summaryHeader = (theme) => css`
  color: ${theme.colors.secondary.dark};
  margin-bottom: 5px;
`;

export const earned = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const amount = (theme) => css`
  color: ${theme.colors.secondary.dark};
`;

export const rewardMeContainer = css`
  width: 80px;
`;

export const upperSection = (theme) => css`
  background: ${theme.colors.secondary.superLight};
  flex-direction: row;
  justify-items: center;
  align-content: center;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 24px;
`;

export const summaryContainer = css`
  flex-grow: 1;
`;

export const lowerSection = css`
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding-vertical: 24px;
  padding-left: 24px;
`;

export const arrow = css`
  align-self: center;
`;

export const brandImage = css`
  width: 64px;
  height: 64px;
  border-radius: 16px;
`;

export const imageContainer = css`
  width: 80px;
  padding-vertical: 8px;
`;

export const brand = (theme) => css`
  color: ${theme.colors.contrastColor};
  margin-right: 8px;
`;

export const brandPercentage = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const selectedMerchant = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  margin-bottom: 8px;
`;

export const rowContainer = css`
  flex-direction: row;
  align-items: center;
`;

export const brandDetail = (theme) => css`
  padding-vertical: 8px;
  flex-grow: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.borderColor};
`;

export const button = css`
  margin-top: 16px;
  margin-right: 24px;
`;
