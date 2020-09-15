import {css} from '@emotion/native';
import {APP_BAR_HEIGHT} from '@/constants/layout';

export const imageStyle = css`
  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const toolsRowContainer = css`
  flex-direction: row;
  align-items: center;
  height: ${String(APP_BAR_HEIGHT)}px;
`;

export const buttons = css`
  width: 40px;
  aspect-ration: 1;
  padding: 9px;
  margin-right: 16px;
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
  margin-top: 4px;
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
