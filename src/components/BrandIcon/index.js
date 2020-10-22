import React from 'react';
import {Image} from 'react-native';

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
  return (
    <Image source={ImgSrc} style={[icon(sizeVariant), style]} {...props} />
  );
};

export default BrandIcon;
