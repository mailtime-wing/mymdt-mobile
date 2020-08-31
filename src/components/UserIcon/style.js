import {css} from '@emotion/native';

export const container = css`
  align-self: flex-start;
`;

export const accountIcon = theme => css`
  width: 40px;
  height: 40px;
  aspect-ratio: 1;
  border-radius: 20px;
  border: 1px solid ${theme.colors.background2};
`;
