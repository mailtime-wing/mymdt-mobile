import {css} from '@emotion/native';

export const container = (theme) => css`
  ${theme.colors.elevatedDarkerBackgroundFlat};
  height: 100%;
`;

export const cardContainer = css`
  z-index: 1;
  margin-top: 16px;
  align-self: center;
`;

export const imageStyle = css`
  align-self: center;
`;

export const upgradeSection = css`
  margin-top: -88px;
  padding-top: 90px;
  z-index: -1;
`;

export const sectionMargin = css`
  margin-bottom: 16px;
`;
