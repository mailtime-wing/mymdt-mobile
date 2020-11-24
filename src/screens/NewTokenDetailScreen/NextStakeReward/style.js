import {css} from '@emotion/native';

export const container = (theme) => css`
  ${theme.colors.elevatedDarkerCardFlat};
  border-radius: 24px;
  padding: 24px;
`;

export const header = (theme) => css`
  color: ${theme.colors.secondary.normal};
  text-align: center;
  margin-bottom: 16px;
`;

export const center = css`
  justify-content: center;
`;
