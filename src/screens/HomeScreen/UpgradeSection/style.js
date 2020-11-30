import {css} from '@emotion/native';

export const container = css`
  border-radius: 24px;
  padding: 24px;
`;

export const sectionTitle = (theme) => css`
  color: ${theme.colors.secondary.normal};
  text-align: center;
  margin-bottom: 24px;
`;

export const button = css`
  margin-top: 16px;
`;
