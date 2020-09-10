import {css} from '@emotion/native';

export const hintStyle = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  margin-top: 160px;
  text-align: center;
`;

export const container = css`
  align-items: center;
`;

export const errorStyle = theme => css`
  color: ${theme.colors.textOnError.normal};
  text-align: center;
`;

export const pinDot = theme => css`
  width: 16;
  height: 16;
  border-radius: 25px;
  border-width: 1px;
  border-color: ${theme.colors.secondary.normal};
`;

export const pinMask = theme => css`
  width: 16;
  height: 16;
  border-radius: 25px;
  background-color: ${theme.colors.secondary.normal};
`;

export const pinMaskError = theme => css`
  background-color: ${theme.colors.textOnError.normal};
`;
