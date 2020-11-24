import {css} from '@emotion/native';

export const centered = css`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const modalHeader = css`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const modalHeading = (theme) => css`
  flex: 1;
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const closeImage = (theme) => css`
  tint-color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const modalDescription = (theme) => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
  margin-bottom: 24px;
`;

export const subtypeItemContainer = css`
  flex-direction: row;
  align-items: center;
  padding-vertical: 12px;
`;

export const subtypeItemIcon = css`
  margin-right: 16px;
`;

export const subtypeItemLabel = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const modalContainer = (theme) => css`
  padding: 24px;
  ${theme.colors.elevatedBackgroundHigh};
`;
