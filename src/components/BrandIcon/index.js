import React from 'react';
import {View, Image} from 'react-native';
import {useTheme} from 'emotion-theming';

import {iconContainer, icon} from './style';

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
    <View style={[iconContainer(theme, sizeVariant)]}>
      <Image source={ImgSrc} style={[icon(sizeVariant), style]} {...props} />
    </View>
  );
};

export default BrandIcon;
