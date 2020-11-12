import {css} from '@emotion/native';

export const progressBarContainer = css`
  margin-top: 16px;
  margin-bottom: 24px;
`;

export const detailStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const sectionHeaderStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const progressTitleStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const progressLabelStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const referralContainer = css`
  margin-top: 16px;
  flex-direction: row;
  align-items: center;
`;

export const inputContainer = css`
  margin-right: 16px;
  flex: 1;
`;

export const textInput = (theme) => css`
  padding: 14px 16px;
  color: ${theme.colors.contrastColor};
`;

export const textInputContainer = (theme) => css`
  border-radius: 8px;
  border: 2px solid transparent;
  margin: 4px 0;
  background-color: ${theme.colors.background2};
`;

export const container = css`
  padding-top: 24px;
  padding-horizontal: 24px;
`;
