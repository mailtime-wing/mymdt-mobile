import {css} from '@emotion/native';

export const sectionContainer = css`
  border-radius: 24px;
  padding: 24px;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const header = theme => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 8px;
`;

export const privilege = css`
  flex-direction: row;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const privilegeDetail = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const highlight = theme => css`
  color: ${theme.colors.secondary.normal};
`;

export const privilegeDetailContainer = css`
  flex: 2;
  margin-left: 8px;
`;

export const claimButton = css`
  width: auto;
`;
