import {css} from '@emotion/native';

export const centeredView = css`
  flex: 1;
  justify-content: flex-end;
  background-color: #00000044;
`;

export const modal = css`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const container = theme => css`
  width: 100%;
  height: auto;
  justify-content: center;
  background-color: ${theme.colors.background1};
  box-shadow: 0px 4px 10px ${theme.colors.borderColor};
  border-radius: 24px;
  padding-top: 20px;
  padding-bottom: 50px;
`;

export const headerStyle = theme => css`
  color: ${theme.colors.contrastColor};
  text-align: center;
  padding-bottom: 12px;
`;
