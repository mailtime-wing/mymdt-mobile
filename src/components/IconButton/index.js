import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';

import {container, icon} from './style';

/**
 * @typedef {Object} Props
 * @property {string} color
 * @property {'filled'|'outlined'|'transparent'} variant
 * @property {'small'|'normal'} sizeVariant
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */
const IconButton = ({
  color,
  variant,
  sizeVariant,
  svgIcon: SvgIcon,
  ...props
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={container(theme, variant, sizeVariant, color)}
      {...props}>
      <SvgIcon {...icon(theme, variant, sizeVariant, color)} />
    </TouchableOpacity>
  );
};

export default IconButton;
