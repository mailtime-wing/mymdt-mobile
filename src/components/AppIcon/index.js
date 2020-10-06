import React from 'react';
import {View} from 'react-native';

import {container, icon} from './style';

/**
 * @typedef {Object} Props
 * @property {string} color
 * @property {string} backgroundColor
 * @property {'small'|'normal'|'large'} sizeVariant
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */
const AppIcon = ({
  color,
  backgroundColor,
  sizeVariant,
  svgIcon: SvgIcon,
  style,
  ...props
}) => {
  return (
    <View style={[container(sizeVariant, backgroundColor), style]} {...props}>
      <SvgIcon {...icon(sizeVariant, color)} />
    </View>
  );
};

export default AppIcon;
