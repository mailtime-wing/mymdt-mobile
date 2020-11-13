import {css} from '@emotion/native';

export const container = (theme) => css`
  ${theme.colors.elevatedBackground3};
  padding-vertical: 24px;
`;

export const requirement = (theme) => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 16px;
  text-align: center;
`;

export const requirementSection = css`
  padding-horizontal: 16px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

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
