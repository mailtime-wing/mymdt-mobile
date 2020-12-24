import {css} from '@emotion/native';

export const container = css`
  padding-horizontal: 24px;
`;

export const formContainer = css`
  margin-top: 24px;
`;

export const profilePictureText = (theme) => css`
  color: ${theme.colors.contrastColor};
`;

export const profilePictureContainer = css`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const editingStyle = css`
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const dateFieldContainer = css`
  margin-top: 24px;
`;

export const errorStyle = (theme) => css`
  color: ${theme.colors.textOnError.normal};
`;

export const nameStyle = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  margin-left: 24px;
`;
