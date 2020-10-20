import {css} from '@emotion/native';

export const sectionContainer = css`
  border-radius: 24px;
  padding: 16px 24px;
  align-items: center;
`;

export const actionsContainer = css`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const nameStyle = (theme) => css`
  color: ${theme.colors.secondary.normal};
  text-align: center;
`;

export const shortcut = css`
  flex-basis: 33%;
  align-items: center;
  padding: 8px;
`;

export const quickActions = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  margin-bottom: 16px;
`;
