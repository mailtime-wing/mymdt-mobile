import {css} from '@emotion/native';

export const container = css`
  border-radius: 24px;
  padding: 24px;
`;

export const sectionTitle = (theme) => css`
  color: ${theme.colors.secondary.normal};
  text-align: center;
`;

export const progressTitleStyle = (theme) => css`
  color: ${theme.colors.secondary.normal};
`;

export const progressLabelStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const progressContainer = css`
  margin-right: 16px;
  flex: 5;
`;

export const button = css`
  flex: 3;
`;

export const rowContainer = css`
  margin-top: 24px;
  flex-direction: row;
  align-items: center;
`;
