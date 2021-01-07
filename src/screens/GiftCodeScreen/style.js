import {css} from '@emotion/native';

export const image = css`
  width: 100%;
`;

export const safeAreaView = css`
  flex: 1;
`;

export const container = css`
  height: 200px;
`;

export const title = (theme) => css`
  color: ${theme.colors.textOnThemeBackground.white};
  position: absolute;
  bottom: 24px;
  left: 24px;
  z-index: 1;
`;

export const linearGradient = css`
  top: 50%;
  height: 50%;
`;

export const backgroundContainer = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
