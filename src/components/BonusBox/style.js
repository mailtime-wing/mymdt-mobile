import {css} from '@emotion/native';

export const titleText = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const detailText = theme => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const card = css`
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
