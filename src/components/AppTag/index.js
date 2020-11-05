import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';

import {container, text as textStyle, icon} from './style';

/**
 * @typedef {Object} Props
 * @property {'normal'|'transparent'} variant
 * @property {'small'|'normal'} sizeVariant
 * @property {'primary'|'secondary'|'contrast'|'onBackground'} colorVariant
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */
const AppTag = ({
  variant,
  sizeVariant,
  colorVariant,
  text,
  svgIcon: SvgIcon,
  style,
}) => {
  let appTextVariant = '';
  switch (sizeVariant) {
    case 'small':
      appTextVariant = 'overline';
      break;
    case 'normal':
      appTextVariant = 'smallText';
      break;
    default:
      break;
  }

  const theme = useTheme();

  return (
    <View style={[container(theme, variant, sizeVariant, colorVariant), style]}>
      {SvgIcon && <SvgIcon {...icon(theme, variant, colorVariant, !!text)} />}
      <AppText
        variant={appTextVariant}
        style={textStyle(theme, variant, colorVariant)}>
        {text}
      </AppText>
    </View>
  );
};

export default AppTag;
