import {css} from '@emotion/native';

export const centered = css`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding-horizontal: 24px;
`;

export const modalBody = theme => css`
  width: 100%;
  justify-content: center;
  background-color: ${theme.colors.background1};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 24px;
`;
