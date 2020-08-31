import {css} from '@emotion/native';

export const coninsContainer = css`
  flex-direction: row;
`;

export const accountContainer = css`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 16px;
  height: 64px;
`;

export const coinChip = theme => css`
  padding: 8px;
  background-color: ${theme.colors.background1};
  border-radius: 24px;
`;

export const marginRight = css`
  margin-right: 8px;
`;

export const membershipPosition = css`
  position: absolute;
  left: 30;
  bottom: 0;
`;

export const leftContainer = css`
  flex: 1;
`;
