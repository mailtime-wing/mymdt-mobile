import {css} from '@emotion/native';

export const sectionContainer = css`
  flex-direction: row;
  border-radius: 24px;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const nameStyle = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
  margin-top: 8px;
`;

export const shortcut = css`
  flex: 1;
  align-items: center;
`;
