import {css} from '@emotion/native';

export const headerContainer = css`
  margin-horizontal: 24px;
  margin-bottom: 16px;
`;

export const title = (theme) => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 24px;
`;

export const description = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const errorView = (theme) => css`
  background-color: ${theme.colors.errorBackground};
  padding: 16px;
  border-radius: 16px;
  margin-top: 16px;
`;

export const errorMessage = (theme) => css`
  color: ${theme.colors.textOnError.light};
`;

export const sectionContainer = (theme) => css`
  flex-direction: row;
  align-items: center;
  padding-top: 14px;
  padding-bottom: 11px;
  margin-horizontal: 24px;
  border-bottom-width: 1px;
  border-color: ${theme.colors.background3};
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
  padding: 16px 24px;
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

export const errorTag = css`
  margin-right: 8px;
`;
