import React from 'react';
import {TouchableOpacity} from 'react-native';
import {container, styles} from './style';
import {useTheme} from 'emotion-theming';
import AppAvator from '@/components/AppAvator';

/**
 * @typedef {Object} Props
 * @property {'icon'|'navigator'} variant
 * @property {'small'|'normal'|'large'} sizeVariant
 */

/**
 *
 * @type {import('react').FunctionComponent<Props>}
 */

const UserIcon = ({source, style, variant, sizeVariant, ...props}) => {
  const theme = useTheme();

  if (variant === 'navigator') {
    return (
      <TouchableOpacity style={container} {...props}>
        <AppAvator
          sizeVariant={sizeVariant}
          style={[styles(theme).accountIcon, style]}
          imageSrc={source}
        />
      </TouchableOpacity>
    );
  }

  return (
    <AppAvator
      sizeVariant={sizeVariant}
      style={[styles(theme).accountIcon, style]}
      imageSrc={source}
    />
  );
};

UserIcon.defaultProps = {
  sizeVariant: 'small',
  source: require('@/assets/default_icon.png'),
};

export default UserIcon;
