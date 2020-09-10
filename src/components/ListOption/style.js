import {css} from '@emotion/native';

export const listLabel = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const listValue = theme => css`
  color: ${theme.colors.textOnBackground.mediumEmphasis};
`;

export const marginRight = css`
  margin-right: 16px;
`;

export const option = css`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`;

export const valueContainer = css`
  flex-direction: row;
  align-items: center;
`;
