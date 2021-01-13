import {css} from '@emotion/native';

export const titleContainer = css`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 16px;
  align-items: center;
`;

export const screenHorizontalPadding = css`
  padding-horizontal: 24px;
`;

export const removeText = (theme) => css`
  color: ${theme.colors.textOnError.normal};
`;

export const detailText = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 24px;
`;

export const titleText = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const itemContainer = css`
  padding-vertical: 6px;
  min-height: 48px;
`;

export const unbindButton = (theme) => css`
  border: 1px solid ${theme.colors.errorBackground};
  border-radius: 20px;
  padding: 8px;
  height: auto;
`;

export const addEmailButton = css`
  align-self: center;
`;
