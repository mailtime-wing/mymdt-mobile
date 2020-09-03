import {css} from '@emotion/native';

export const headerContainer = css`
  margin-horizontal: 24px;
  margin-bottom: 38px;
`;

export const title = theme => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 24px;
`;

export const description = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const sectionContainer = theme => css`
  flex-direction: row;
  align-items: center;
  padding-top: 14px;
  padding-bottom: 11px;
  margin-horizontal: 24px;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  background-color: ${theme.colors.background1};
`;

export const sectionTitle = css`
  flex: 1;
`;

export const sectionRemoveButton = enabled => css`
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
`;

export const accountName = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const accountNo = theme => css`
  color: ${theme.colors.textOnBackground.disabled};
`;
