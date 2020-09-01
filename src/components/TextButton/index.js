import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';

import {container, textButton} from './style';

/**
 * @typedef {Object} Props
 * @property {'filled'|'outlined'|'transparent'|'contrast_outlined'} variant
 * @property {'compact'|'normal'|'large'} sizeVariant
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */
const TextButton = ({variant, sizeVariant, text, style, ...props}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[container(theme, variant, sizeVariant), style]}
      {...props}>
      <AppText variant="button" style={textButton(theme, variant, sizeVariant)}>
        {text}
      </AppText>
    </TouchableOpacity>
  );
};

export default TextButton;
