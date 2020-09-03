import {css} from '@emotion/native';

export const rewardContainer = css`
  flex-direction: row;
  padding-top: 16px;
  padding-bottom: 16px;
`;

export const contactContainer = css`
  flex: 2;
  margin-left: 16px;
`;

export const nameStyle = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const numberStyle = theme => css`
  color: ${theme.colors.textOnBackground.disabled};
`;

export const statusStyle = theme => css`
  flex: 3;
  color: ${theme.colors.textOnBackground.disabled};
  align-self: center;
  text-align: right;
`;
