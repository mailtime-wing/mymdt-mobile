import {css} from '@emotion/native';

export const container = css`
  padding-horizontal: 24px;
  padding-bottom: 24px;
`;

export const detailStyle = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 24px;
`;

export const dateContainer = css`
  margin-bottom: 24px;
`;

export const amountCurrencyContainer = css`
  flex-direction: row;
  align-items: center;
`;

export const currencyContainer = css`
  margin-right: 8px;
  flex: 1;
`;

export const amountContainer = css`
  flex: 2;
`;
