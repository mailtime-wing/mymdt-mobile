import {css} from '@emotion/native';

export const margin = css`
  margin-top: 4px;
  margin-bottom: 8px;
`;

export const day = (theme) => css`
  text-align: center;
  color: ${theme.colors.contrastColor};
`;

export const dayContainer = css`
  flex-direction: column;
`;

export const card = (theme, isToday) => css`
  padding: 8px;
  background-color: transparent;
  width: 80px;
  border: 1px solid ${theme.colors.background3};
  ${isToday && `border: 2px solid ${theme.colors.secondary.normal}`};
  border-radius: 16px;
  margin: 0 4px;
`;

export const centered = css`
  align-self: center;
`;
