import {css} from '@emotion/native';

export const historyListContainer = css`
  border-radius: 24px 24px 0px 0px;
`;

export const noTransaction = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  margin-vertical: 40px;
  text-align: center;
`;
