import {css} from '@emotion/native';

export const finished = (theme) => css`
  color: ${theme.colors.primary.normal};
  margin-left: 4px;
`;

export const finishedContainer = css`
  flex-direction: row;
  flex: 3;
  justify-content: center;
`;

export const completeSetup = (theme) => css`
  color: ${theme.colors.primary.normal};
  flex: 5;
`;

export const invitationOnly = (theme) => css`
  color: ${theme.colors.secondary.normal};
  flex: 5;
`;

export const rowContainer = css`
  flex-direction: row;
  align-items: center;
`;

export const requestButton = css`
  flex: 3;
`;

export const or = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  margin-vertical: 8px;
`;
