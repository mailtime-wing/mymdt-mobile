import {css} from '@emotion/native';

export const container = (theme) => css`
  flex: 1;
  justify-content: space-between;
  padding-bottom: ${String(theme.space.marginBetweenContentAndScreenBottom)}px;
  padding-horizontal: 24px;
`;

export const redeemMsg = (theme) => css`
  color: ${theme.colors.primary.normal};
  text-align: center;
`;

export const marginBetweenImageAndMsg = css`
  flex-basis: 24;
  flex-shrink: 1;
`;

export const imageAndMsgContainer = css`
  flex: 1;
`;

export const image = css`
  flex-basis: 240;
  flex-shrink: 1;
  aspect-ratio: 1;
  align-self: center;
`;

export const amountContainer = css`
  position: absolute;
  align-self: center;
  align-items: center;
  height: 100%;
`;
