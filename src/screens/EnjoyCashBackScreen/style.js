import {css} from '@emotion/native';

export const container = css`
  flex: 1;
`;

export const bodyContainer = css`
  padding-horizontal: 24px;
`;

export const inner = css`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 24px;
`;

export const title = (theme) => css`
  color: ${theme.colors.secondary.normal};
`;

export const detail = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 29px;
`;

export const image = css`
  margin-bottom: 40px;
`;
