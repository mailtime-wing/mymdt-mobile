import {css} from '@emotion/native';
import {transparentize} from 'polished';

export const headerContainer = css`
  margin-horizontal: 24px;
`;

export const footerContainer = css`
  margin-horizontal: 24px;
  margin-vertical: 40px;
`;

export const title = theme => css`
  font-size: 36px;
  line-height: 36px;
  height: 36px;
  font-weight: 500;
  color: ${theme.colors.secondary.normal};
  margin-bottom: 24px;
  text-transform: uppercase;
`;

export const description = theme => css`
  font-size: 16px;
  line-height: 24px;
  color: ${theme.colors.black.light};
`;

export const listHeading = theme => css`
  margin-top: 40px;
  height: 40px;
  line-height: 40px;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${theme.colors.black.superLight};
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
  font-size: 16px;
  line-height: 24px;
  color: ${transparentize(0.2, theme.colors.black.normal)};
`;

export const accountNo = theme => css`
  font-size: 12px;
  line-height: 18px;
  color: ${theme.colors.black.superLight};
`;

export const moreButton = css`
  margin-top: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
`;
