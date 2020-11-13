import {css} from '@emotion/native';

export const progressTitleStyle = (theme) => css`
  color: ${theme.colors.secondary.normal};
`;

export const progressLabelStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  text-align: right;
`;

export const progressContainer = css`
  margin-right: 16px;
  flex: 6;
`;

export const button = css`
  flex: 4;
`;

export const rowContainer = css`
  flex-direction: row;
  align-items: center;
`;

export const finished = (theme) => css`
  color: ${theme.colors.primary.normal};
  margin-left: 4px;
`;

export const finishedContainer = css`
  flex-direction: row;
  flex: 4;
  justify-content: center;
`;
