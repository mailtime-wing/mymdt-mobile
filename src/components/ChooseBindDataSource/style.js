import {Dimensions} from 'react-native';
import {css} from '@emotion/native';

// TODO: put this media-query-like effect in theme
const {width} = Dimensions.get('window');
const scaleDown = width <= 375;

export const bodyContainer = (theme) => css`
  flex: 1;
  background: ${theme.colors.themeBackground};
  padding-horizontal: ${scaleDown ? '16px' : '24px'};
  padding-bottom: ${String(theme.space.marginBetweenContentAndScreenBottom)}px;
`;

export const backgroundImage = css`
  align-self: center;
  margin-bottom: 16px;
  max-width: 100%;
  flex: 1;
`;

export const titleStyle = (theme) => css`
  color: ${theme.colors.textOnThemeBackground.highEmphasis};
  text-align: center;
  margin-bottom: 16px;
`;

export const detailStyle = (theme) => css`
  color: ${theme.colors.textOnThemeBackground.mediumEmphasis};
  text-align: center;
  margin-bottom: 16px;
`;

export const margin = css`
  margin-vertical: 8px;
`;
