import {css} from '@emotion/native';

export const titleText = () => css`
  color: rgba(0, 0, 0, 0.8);
`;

export const detailText = theme => css`
  color: ${theme.colors.black.superLight};
`;

export const card = theme => css`
  background: ${theme.colors.white.normal};
  border-radius: 24px;
`;

export const headerContainer = css`
  flex-direction: row;
  padding: 24px;
`;

export const headerRightContainer = css`
  flex: 6;
`;

export const iconStyle = css`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 16px;
`;
