import {css} from '@emotion/native';

export const imageStyle = css`
  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
  margin-bottom: 24px;
`;

export const toolsRowContainer = css`
  align-self: flex-end;
  flex-direction: row;
`;

export const buttons = css`
  width: 36px;
  aspect-ration: 1;
  padding: 7px;
  margin-right: 16px;
`;

export const bigAccountIcon = css`
  height: 56px;
  border-radius: 28px;
`;

export const name = theme => css`
  color: ${theme.colors.textOnBackground.highEmphasis};
`;

export const validDate = theme => css`
  color: ${theme.colors.textOnBackground.disabled};
  margin-left: 8px;
`;

export const rowContainer = css`
  flex-direction: row;
`;

export const rightContainer = css`
  margin-left: 16px;
`;

export const userRowContainer = css`
  flex-direction: row;
  margin-left: 24px;
  margin-right: 24px;
  align-items: center;
`;

export const sectionsContainer = css`
  padding: 24px;
`;
