import {css} from '@emotion/native';

export const optionButton = (theme, active) => css`
  padding: 5.5px 12px;
  background-color: ${active ? theme.colors.secondary.normal : 'transparent'};
  border: ${active
    ? theme.colors.secondary.normal
    : theme.colors.textOnBackground.disabled};
  border-radius: 34px;
  margin-right: 8px;
`;

export const optionsContainer = css`
  height: 32px;
  flex-direction: row;
`;

export const labelStyle = theme => css`
  margin-bottom: 8px;
  color: ${theme.colors.contrastColor};
`;

export const genderStyle = (theme, active) => css`
  color: ${active ? theme.colors.background1 : theme.colors.contrastColor};
`;
