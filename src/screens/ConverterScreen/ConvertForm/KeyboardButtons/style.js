import {css} from '@emotion/native';

export const inputAccessoryViewContainer = (theme) => css`
  background-color: ${theme.colors.background1};
  flex-direction: row;
  align-items: center;
`;

export const inputAccessoryButton = (theme) => css`
  flex: 1;
  padding: 16px 0;
  border: 1px solid ${theme.colors.background2};
`;

export const inputAccessoryButtonText = (theme) => css`
  color: ${theme.colors.secondary.dark};
  text-align: center;
`;
