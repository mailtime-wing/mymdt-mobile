import {css} from '@emotion/native';

export const tabGroupContainer = css`
  flex-direction: row;
`;

export const tabContainer = (theme) => css`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
  padding-bottom: 16px;
  border-width: 0 0 1px 0;
  border-bottom-color: ${theme.colors.borderColor};
`;

export const activeBottomBar = (activeTabColor) => css`
  background: ${activeTabColor};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 4px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export const tabNameStyle = (theme, active, activeTextColor) => css`
  color: ${active
    ? activeTextColor
    : theme.colors.textOnBackground.mediumEmphasis};
  text-align: center;
`;
