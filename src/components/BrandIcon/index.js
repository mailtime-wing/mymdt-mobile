import React from 'react';
import {Image} from 'react-native';
import {useTheme} from 'emotion-theming';

import {icon} from './style';

/**
 * @typedef {Object} Props
 * @property {'normal'|'large'} sizeVariant
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */

const BrandIcon = ({ImgSrc, sizeVariant, style, ...props}) => {
  const theme = useTheme();
  return (
    <Image
      source={ImgSrc}
      style={[icon(theme, sizeVariant), style]}
      {...props}
    />
  );
};

export default BrandIcon;
