import {css} from '@emotion/native';

export const historyHeaderContainer = (theme) => css`
  flex-direction: row;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.background2};
`;

export const moreContainer = css`
  flex-direction: row;
  align-items: center;
`;

export const cashBackTitle = (theme) => css`
  color: ${theme.colors.primary.normal};
`;

export const background = (theme) => css`
  ${theme.colors.elevatedDarkerCardFlat};
`;
