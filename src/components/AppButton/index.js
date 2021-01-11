import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';
import LoadingAnimation from '@/components/LoadingAnimation';

import AppText from '@/components/AppText2';

import {container, text as textStyle, icon} from './style';

/**
 * @typedef {Object} Props
 * @property {'filled'|'outlined'|'transparent'} variant
 * @property {'moreCompact'|'compact'|'normal'|'large'} sizeVariant
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
  textPropsStyle,
  children,
  isLoading,
  ...props
}) => {
  const theme = useTheme();
  const _isLoading = isLoading && sizeVariant === 'large'; // loading animation only apply to large button
  const _disabled = disabled || _isLoading;

  return (
    <TouchableOpacity
      style={[
        container(
          theme,
          variant,
          sizeVariant,
          colorVariant,
          _disabled,
          _isLoading,
        ),
        style,
      ]}
      disabled={_disabled}
      {...props}>
      {SvgIcon && <SvgIcon {...icon(theme, variant, colorVariant, !!text)} />}
      {_isLoading ? (
        <LoadingAnimation />
      ) : (
        children || (
          <AppText
            variant={
              sizeVariant === 'moreCompact' ? 'moreCompactButton' : 'button'
            }
            style={[textStyle(theme, variant, colorVariant), textPropsStyle]}>
            {text}
          </AppText>
        )
      )}
    </TouchableOpacity>
  );
};

AppButton.defaultProps = {
  disabled: false,
  isLoading: false,
};

export default AppButton;
