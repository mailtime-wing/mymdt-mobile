import {css} from '@emotion/native';

export const historyListContainer = css`
  border-radius: 24px 24px 0px 0px;
  margin-top: 16px;
`;

export const historyListHeader = (theme) => css`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 16px 24px;
  border-bottom-width: 1px;
  border-color: ${theme.colors.background2};
  elevation: 1;
  margin-bottom: 8px;
`;
