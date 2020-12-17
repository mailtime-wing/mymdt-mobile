import {css} from '@emotion/native';

export const container = css`
  margin-top: auto;
  margin-bottom: auto;
  align-self: center;
  z-index: 1;
`;

export const congrats = (theme) => css`
  color: ${theme.colors.secondary.normal};
  text-align: center;
`;

export const member = (theme) => css`
  color: ${theme.colors.background1};
  text-align: center;
`;

export const button = css`
  align-self: center;
  margin-top: 20px;
`;

export const firework = css`
  z-index: 0;
`;

export const background = css`
  height: 100%;
`;

export const congratsContainer = css`
  align-self: center;
  position: absolute;
  top: 170;
`;
