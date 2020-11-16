import {css} from '@emotion/native';

export const container = (theme) => css`
  ${theme.colors.elevatedBackground3};
  padding-vertical: 24px;
`;

export const requirement = (theme) => css`
  color: ${theme.colors.secondary.normal};
  margin-bottom: 16px;
  text-align: center;
`;

export const requirementSection = css`
  padding-horizontal: 16px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;
