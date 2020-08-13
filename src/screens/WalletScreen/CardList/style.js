import {css} from '@emotion/native';

export const card = backgroundColor => css`
  width: 260px;
  height: 164px;
  border-radius: 16px;
  background-color: ${backgroundColor};
  padding: 16px;
  justify-content: space-between;
`;

export const sliderContainer = css`
  padding: 24px 0;
`;

export const usd = css`
  color: rgba(255, 255, 255, 0.6);
  text-align: right;
`;

export const cardName = cardNameColor => css`
  color: ${cardNameColor}; 
`;
