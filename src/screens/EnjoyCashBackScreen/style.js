import {css} from '@emotion/native';

export const container = css`
  flex: 1;
`;

export const bodyContainer = css`
  padding-horizontal: 24px;
`;

export const inner = css`
  justify-content: space-between;
  flex: 1;
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
  width: 100%;
`;
