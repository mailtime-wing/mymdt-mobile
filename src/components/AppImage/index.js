import React from 'react';
import {Image} from 'react-native';

import {image} from './style';

/**
 * @typedef {Object} Props
 * @property {'small'|'normal'|'large'} sizeVariant
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */

const AppImage = ({sizeVariant, imageSrc, style}) => {
  return <Image source={imageSrc} style={[image(sizeVariant), style]} />;
};

export default AppImage;
