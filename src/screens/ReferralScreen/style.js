import {css} from '@emotion/native';

export const titleStyle = theme => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 30px;
`;

export const container = css`
  padding-left: 24px;
  padding-right: 24px;
`;

export const tabGroupContainer = css`
  flex-direction: row;
`;

export const tabContainer = theme => css`
  flex: 1;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  border-width: 0 0 1px 0;
  border-bottom-color: ${theme.colors.borderColor};
`;

export const activeBottomBar = theme => css`
  background: ${theme.colors.secondary.normal};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 4px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export const contentContainer = css`
  padding-top: 24px;
`;

export const tabNameStyle = (theme, active) => css`
  color: ${active
    ? theme.colors.secondary.dark
    : theme.colors.textOnBackground.mediumEmphasis};
`;
