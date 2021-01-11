import {css} from '@emotion/native';

export const container = (theme) => css`
  flex: 1;
  justify-content: space-between;
  padding-bottom: ${String(theme.space.marginBetweenContentAndScreenBottom)}px;
  padding-horizontal: 24px;
`;

export const contentContainer = css`
  flex: 1;
`;

export const redeemMsg = (theme) => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  text-align: center;
`;

export const marginBetweenImageAndMsg = css`
  flex-basis: 48;
  flex-shrink: 40;
`;

export const marginBetweenMsgAndDetail = css`
  flex-basis: 16;
  flex-shrink: 20;
`;

export const detail = (theme) => css`
  color: ${theme.colors.textOnBackground.disabled};
  text-align: center;
`;

export const email = (theme) => css`
  color: ${theme.colors.primary.normal};
`;

export const image = css`
  flex-basis: 144;
  flex-shrink: 1;
  align-self: center;
`;
