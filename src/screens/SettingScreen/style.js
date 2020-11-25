import {css} from '@emotion/native';

export const image = css`
  width: 100%;
  border-radius: 24px;
`;

export const nameContainer = css`
  margin-left: 16px;
  flex: 1;
`;

export const profileContainer = css`
  padding-horizontal: 24px;
  position: absolute;
  width: 100%;
  flex-direction: row;
  bottom: 24px;
`;

export const name = (theme) => css`
  color: ${theme.colors.textOnThemeBackground.highEmphasis};
`;

export const listHeader = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  padding-top: 24px;
  padding-bottom: 12px;
`;

export const container = (theme) => css`
  ${theme.colors.elevatedDarkerBackgroundMedium}
  padding-bottom: 24px;
`;

export const cardContainer = (theme) => css`
  ${theme.colors.elevatedDarkerCardMedium};
  padding-horizontal: 24px;
  border-radius: 24px;
  margin-top: 16px;
`;

export const paddingBottom = css`
  padding-bottom: 8px;
`;

export const signOut = (theme) => css`
  margin-vertical: 24px;
  align-self: center;
  color: ${theme.colors.secondary.normal};
`;
