import {Dimensions} from 'react-native';
import {css} from '@emotion/native';

// TODO: put this media-query-like effect in theme
const {width} = Dimensions.get('window');
const scaleDown = width <= 375;

export const bodyContainer = css`
  flex-shrink: 1;
  padding-horizontal: ${scaleDown ? '16px' : '24px'};
`;

export const backgroundImage = css`
  align-self: center;
  margin-bottom: 16px;
  max-width: 100%;
  flex-shrink: 1;
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
