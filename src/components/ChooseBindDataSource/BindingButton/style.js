import {css} from '@emotion/native';

export const container = (theme) => css`
  ${theme.colors.elevatedDarkerCardFlat};
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  padding: 16px;
`;

export const textContainer = css`
  margin-left: 16px;
  flex: 1;
`;

export const header = (theme) => css`
  color: ${theme.colors.contrastColor};
`;
