import {css} from '@emotion/native';

export const container = (theme) => css`
  ${theme.colors.elevatedDarkerBackgroundFlat};
  height: 100%;
`;

export const imageStyle = css`
  align-self: center;
  margin-top: 16px;
  z-index: 1;
`;

export const upgradeSection = css`
  margin-top: -49px;
  padding-top: 90px;
`;

export const sectionMargin = css`
  margin-bottom: 16px;
`;
