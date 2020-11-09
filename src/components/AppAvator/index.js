import React from 'react';
import {Image, View} from 'react-native';
import {useTheme} from 'emotion-theming';

import {
  container,
  icon,
  iconContainer,
  initialsContainer,
  initials,
  styles,
} from './style';

import getRandomInteger from '@/utils/getRandomInteger';
import AppText from '@/components/AppText2';

/**
 * @typedef {Object} Props
 * @property {'default|initials|icon|image'} variant
 * @property {'small'|'normal'|'large'} sizeVariant
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */

const AppAvator = ({
  variant,
  sizeVariant,
  imageSrc,
  svgIcon: SvgIcon,
  backgroundColor,
  color,
  name,
  style,
}) => {
  const theme = useTheme();

  if (variant === 'initials') {
    const colorIndex = getRandomInteger(
      0,
      theme.colors.avatarsInitials.length - 1,
    );
    let appTextVariant = 'initials1';
    if (sizeVariant === 'normal') {
      appTextVariant = 'initials2';
    }
    if (sizeVariant === 'large') {
      appTextVariant = 'initials3';
    }

    return (
      <View
        style={[
          container(sizeVariant),
          initialsContainer(theme, colorIndex),
          style,
        ]}>
        <AppText variant={appTextVariant} style={initials(theme)}>
          {name[0]}
        </AppText>
      </View>
    );
  }

  if (variant === 'icon') {
    return (
      <View
        style={[
          container(sizeVariant),
          iconContainer,
          {backgroundColor: backgroundColor},
          style,
        ]}>
        <SvgIcon {...icon(sizeVariant, color)} />
      </View>
    );
  }

  return (
    <Image
      source={imageSrc}
      style={[
        container(sizeVariant),
        variant === 'image' && styles(theme).border,
        style,
      ]}
    />
  );
};

AppAvator.defaultProps = {
  name: '?',
};

export default AppAvator;
