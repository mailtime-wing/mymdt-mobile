import {css} from '@emotion/native';

export const container = css`
  padding-horizontal: 24px;
`;

export const tickButton = theme => css`
  background-color: ${theme.colors.secondary.normal};
  height: 22px;
  aspect-ratio: 1;
  border-radius: 11px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;
