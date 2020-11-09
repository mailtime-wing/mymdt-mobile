import {css} from '@emotion/native';

export const container = (theme) => css`
  ${theme.colors.elevatedBackground1};
  border-radius: 24px;
  padding-top: 24px;
  padding-bottom: 16px;
`;

export const header = (theme) => css`
  color: ${theme.colors.primary.normal};
  text-align: center;
  margin-bottom: 16px;
`;

export const center = css`
  justify-content: center;
`;

export const diviver = (theme) => css`
  height: 1px;
  background: ${theme.colors.background2};
  margin-vertical: 24px;
`;

export const summary = (theme) => css`
  background: ${theme.colors.primary.border};
  margin-top: 24px;
  margin-horizontal: 24px;
  border-radius: 16px;
  padding: 8px 16px;
`;

export const rowContainer = css`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 8px;
`;

export const summaryHeader = (theme) => css`
  color: ${theme.colors.primary.normal};
`;

export const percentage = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const payout = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;
