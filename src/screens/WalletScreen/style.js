import {css} from '@emotion/native';

export const container = (theme) => css`
  background: ${theme.colors.secondary.walletBackground};
`;

export const scrollContainer = (theme) => css`
  ${theme.colors.elevatedDarkerBackgroundFlat};
  flex: 1;
`;

export const safeAreaContainer = (theme) => css`
  background: ${theme.colors.secondary.walletBackground};
`;

export const total = (theme) => css`
  color: ${theme.colors.textOnThemeBackground.mediumEmphasis};
  margin-top: 24px;
  margin-bottom: 16px;
`;

export const totalBalance = css`
  justify-content: center;
  margin-bottom: 40px;
`;

export const textAlignCenter = css`
  text-align: center;
`;

export const currenciesView = (theme) => css`
  ${theme.colors.elevatedDarkerCardFlat};
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding-bottom: 16px;
`;

export const separator = (theme) => css`
  margin-left: 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.background2};
`;

export const currencyRow = (theme) => css`
  flex-direction: row;
  padding-vertical: 16px;
`;

export const currency = (theme) => css`
  color: ${theme.colors.secondary.dark};
  padding-left: 24px;
`;

export const amount = css`
  justify-content: flex-end;
`;

export const amountContainer = css`
  flex-grow: 1;
`;

export const payout = (theme) => css`
  text-align: right;
  color: ${theme.colors.textOnBackground.disabled};
  margin-top: 8px;
`;

export const arrow = css`
  align-self: center;
  margin-left: 16px;
  margin-right: 24px;
`;

export const spinner = css`
  margin-left: auto;
`;

export const sectionMargin = css`
  margin-top: 16px;
  margin-bottom: 24px;
`;
