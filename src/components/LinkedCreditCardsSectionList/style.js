import {css} from '@emotion/native';

export const headerContainer = css`
  margin-horizontal: 24px;
  margin-bottom: 16px;
`;

export const errorView = (theme) => css`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.detailBox.secondary};
  padding: 16px;
  border-radius: 16px;
`;

export const errorMessage = (theme) => css`
  color: ${theme.colors.secondary.dark};
  margin-left: 16px;
`;

export const sectionContainer = (theme) => css`
  flex-direction: row;
  align-items: center;
  padding-top: 14px;
  padding-bottom: 11px;
  padding-right: 24px;
  margin-left: 24px;
  border-bottom-width: 1px;
  border-color: ${theme.colors.background3};
  background-color: ${theme.colors.background1};
`;

export const sectionTitle = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  flex: 1;
`;

export const sectionRemoveButton = (enabled) => css`
  opacity: ${enabled ? '1' : '0'};
  width: auto;
`;

export const listItemContainer = css`
  flex-direction: row;
  padding-vertical: 16px;
  padding-left: 24px;
  padding-right: 16px;
  align-items: center;
`;

export const listItemInfoContainer = css`
  margin-left: 16px;
  flex: 1;
`;

export const accountName = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const accountNo = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const itemSeparator = (theme) => css`
  border-bottom-width: 1px;
  border-color: ${theme.colors.background3};
  margin-left: 96px;
`;
