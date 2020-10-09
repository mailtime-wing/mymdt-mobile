import {css} from '@emotion/native';

export const section = css`
  margin-left: 24px;
`;

export const sectionHeader = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  padding-top: 24px;
  padding-bottom: 12px;
`;

export const sectionHeaderContainer = (theme) => css`
  border-width: 0 0 1px 0;
  border-bottom-color: ${theme.colors.background2};
`;

export const item = css`
  padding: 12px 0;
`;

export const title = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const detail = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;
