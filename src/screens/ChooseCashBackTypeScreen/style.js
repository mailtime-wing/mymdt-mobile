import {css} from '@emotion/native';

export const container = css`
  padding-bottom: 24px;
`;

export const scrollContainer = theme => css`
  background: ${theme.colors.secondary.normal};
  padding-left: 24px;
  padding-right: 24px;
`;

export const detail = theme => css`
  color: ${theme.colors.white.normal};
  margin-bottom: 24px;
`;

export const titleStyle = theme => css`
  color: ${theme.colors.white.normal};
  margin-bottom: 16px;
`;

export const boxContainer = theme => css`
  background: ${theme.colors.white.normal};
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 16px;
`;

export const boxLevel = theme => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 8px;
  text-align: center;
`;

export const boxTitle = css`
  margin-bottom: 16px;
  text-align: center;
`;

export const boxDetail = theme => css`
  color: ${theme.colors.black.light};
  margin-bottom: 24px;
`;
