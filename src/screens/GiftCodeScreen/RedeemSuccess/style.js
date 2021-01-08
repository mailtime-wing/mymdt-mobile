import {css} from '@emotion/native';

export const container = (theme) => css`
  flex: 1;
  justify-content: space-between;
  padding-top: 24px;
  padding-bottom: ${String(theme.space.marginBetweenContentAndScreenBottom)}px;
  padding-horizontal: 24px;
`;

export const redeemMsg = (theme) => css`
  color: ${theme.colors.primary.normal};
  text-align: center;
  margin-top: 24px;
`;

export const image = css`
  align-self: center;
  aspect-ratio: 1;
`;

export const amountContainer = css`
  position: absolute;
  align-self: center;
  align-items: center;
  height: 100%;
`;
