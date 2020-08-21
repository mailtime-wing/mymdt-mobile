import {css} from '@emotion/native';

export const headerContainer = css`
  margin-horizontal: 24px;
  margin-bottom: 38px;
`;

export const footerContainer = css`
  margin-horizontal: 24px;
  margin-vertical: 40px;
`;

export const title = theme => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 24px;
`;

export const description = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const sectionContainer = theme => css`
  padding-vertical: 14px;
  margin-left: 24px;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  background-color: ${theme.colors.background};
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

export const moreButton = css`
  margin-top: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
`;
