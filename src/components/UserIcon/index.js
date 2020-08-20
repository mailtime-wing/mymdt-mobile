import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {container, accountIcon} from './style';
import {useTheme} from 'emotion-theming';

const UserIcon = ({
  source = require('@/assets/dog_avatar.png'),
  style,
  ...props
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={container} {...props}>
      <Image style={[accountIcon(theme), style]} source={source} />
    </TouchableOpacity>
  );
};

export default UserIcon;
