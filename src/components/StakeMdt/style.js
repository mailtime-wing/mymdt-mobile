import {css} from '@emotion/native';

export const container = (theme) => css`
  padding: 24px;
  ${theme.colors.elevatedBackground3};
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export const mediumEmphasis = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const rowContainer = css`
  flex-direction: row;
`;

export const stakeSummary = (theme) => css`
  background-color: ${theme.colors.primary.border};
  padding-bottom: 16px;
  padding-horizontal: 16px;
  border-radius: 16px;
`;

export const mdtTextColor = (theme) => css`
  color: ${theme.colors.primary.normal};
`;

export const summaryItem = css`
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

export const stakeButton = css`
  margin-top: 24px;
`;
