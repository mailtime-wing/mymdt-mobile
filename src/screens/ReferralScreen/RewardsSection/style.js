import {css} from '@emotion/native';

export const rewardContainer = css`
  flex-direction: row;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 24px;
`;

export const contactContainer = css`
  flex: 2;
  margin-left: 16px;
`;

export const nameStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const numberStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const statusStyle = (theme) => css`
  flex: 3;
  color: ${theme.colors.textOnBackground.disabled};
  align-self: center;
  text-align: right;
`;

export const sectionHeader = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const sectionHeaderContainer = (theme) => css`
  border-bottom-color: ${theme.colors.background2};
  border-bottom-width: 1px;
  padding-top: 24px;
  padding-bottom: 12px;
`;

export const sectionContainer = css`
  padding-left: 24px;
`;

export const rowContainer = css`
  flex-direction: row;
  margin: auto 0;
`;

export const claimedDateStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const claimContainer = css`
  align-items: flex-end;
`;

export const marginRight = css`
  margin-right: 8px;
`;

export const footer = css`
  margin-bottom: 24px;
`;
