import {css} from '@emotion/native';

export const section = (theme) => css`
  border-width: 0 0 1px 0;
  border-bottom-color: ${theme.colors.background2};
  margin-left: 24px;
`;

export const sectionHeader = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  padding-top: 24px;
  padding-bottom: 12px;
`;

export const sectionFooter = css`
  margin-bottom: 24px;
`;

export const item = css`
  padding: 12px 24px;
`;

export const title = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const detail = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;
