import {css} from '@emotion/native';

export const image = css`
  position: absolute;
  width: 100%;
  overflow: visible;
`;

export const banner = css`
  /* border-radius: 16px; */
  /* width: 100%; */
`;

export const body = css`
  padding-horizontal: 24px;
`;

export const chip = (theme) => css`
  flex-direction: row;
  padding: 8px 12px;
  background: ${theme.colors.background1};
  border-radius: 24px;
  align-items: baseline;
  width: 56.5%;
  margin-bottom: 12px;
`;

export const currency = (theme) => css`
  color: ${theme.colors.secondary.dark};
  margin-right: 4px;
`;

export const amount = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  flex-grow: 1;
`;

export const range = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const firstChipMargin = css`
  margin-top: 24px;
  margin-bottom: 12px;
`;
