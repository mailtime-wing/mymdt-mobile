import {css} from '@emotion/native';

export const container = css`
  padding-top: 40px;
  padding-bottom: 24px;
  padding-horizontal: 40px;
`;

export const availableMdtSection = (theme) => css`
  ${theme.colors.elevatedBackground3};
  padding: 19px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.background2};
`;

export const mediumEmphasis = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const amount = css`
  justify-content: center;
  margin-top: 40px;
`;

export const caption = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  text-align: center;
`;

export const staking = (theme) => css`
  color: ${theme.colors.primary.normal};
  text-align: center;
  margin-vertical: 16px;
`;

export const availableAmount = css`
  align-items: center;
`;

export const percentage = (theme) => css`
  color: ${theme.colors.primary.normal};
`;
