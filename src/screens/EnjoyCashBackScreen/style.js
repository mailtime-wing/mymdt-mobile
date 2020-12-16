import {css} from '@emotion/native';

export const container = css`
  flex: 1;
`;

export const content = css`
  flex: 1;
`;

export const inner = (theme) => css`
  justify-content: space-between;
  flex: 1;
  padding-horizontal: 24px;
  padding-bottom: ${String(theme.space.marginBetweenContentAndScreenBottom)}px;
`;

export const title = (theme) => css`
  color: ${theme.colors.secondary.normal};
`;

export const detail = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 29px;
`;

export const image = css`
  max-width: 100%;
  flex-shrink: 1;
`;
