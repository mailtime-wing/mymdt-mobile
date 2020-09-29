import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import AppIcon from '@/components/AppIcon';
import XIcon from '@/assets/icon_x.svg';
import HeartIcon from '@/assets/heart_icon.svg';
import GiftIcon from '@/assets/gift_icon.svg';

import {container, text as textStyle, xIcon, icon, test} from './style';

/**
 * @typedef {Object} Props
 * @property {'theme'|'info'|'error'} variant
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */

const AppToast = ({variant, text, style, onXPress}) => {
  const theme = useTheme();
  return (
    <View style={[container(theme, variant), style]}>
      {variant === 'theme' && (
        <AppIcon
          sizeVariant="small"
          color={theme.colors.background1}
          backgroundColor="#40C0CA"
          svgIcon={GiftIcon}
          style={icon}
        />
      )}
      {variant === 'info' && (
        <AppIcon
          sizeVariant="small"
          color={theme.colors.background1}
          backgroundColor="#EB5757"
          svgIcon={HeartIcon}
          style={icon}
        />
      )}
      <View style={test}>
        <AppText
          variant="body2"
          numberOfLines={2}
          style={textStyle(theme, variant)}>
          {text}
        </AppText>
      </View>
      <TouchableOpacity onPress={onXPress}>
        <XIcon {...xIcon(theme, variant)} />
      </TouchableOpacity>
    </View>
  );
};

AppToast.defaultProps = {
  text: 'Something went wrong. Please try again.',
};

export default AppToast;
