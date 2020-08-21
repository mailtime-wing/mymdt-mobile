import {css} from '@emotion/native';

export const sectionContainer = theme => css`
  background-color: ${theme.colors.background1};
  flex-direction: row;
  border-radius: 24px;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const name = theme => css`
  color: ${theme.colors.textOnBackground.disabled};
  margin-top: 8px;
`;

export const shortcut = css`
  flex: 1;
  align-items: center;
`;
