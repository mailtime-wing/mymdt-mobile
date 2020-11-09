import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';

import {container, text as textStyle, icon} from './style';

/**
 * @typedef {Object} Props
 * @property {'filled'|'outlined'|'transparent'} variant
 * @property {'compact'|'normal'|'large'} sizeVariant
 * @property {'primary'|'primaryDark'|'secondary'|'secondaryDark'|'alert'|'contrast'|'white'} colorVariant
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */
const AppButton = ({
  variant,
  sizeVariant,
  colorVariant,
  text,
  svgIcon: SvgIcon,
  disabled,
  style,
  ...props
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        container(theme, variant, sizeVariant, colorVariant, disabled),
        style,
      ]}
      disabled={disabled}
      {...props}>
      {SvgIcon && <SvgIcon {...icon(theme, variant, colorVariant, !!text)} />}
      <AppText variant="button" style={textStyle(theme, variant, colorVariant)}>
        {text}
      </AppText>
    </TouchableOpacity>
  );
};

AppButton.defaultProps = {
  disabled: false,
};

export default AppButton;
