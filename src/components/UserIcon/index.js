import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {container, accountIcon} from './style';
import {useTheme} from 'emotion-theming';

const UserIcon = ({source, ...props}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={container} {...props}>
      <Image style={accountIcon(theme)} source={source} />
    </TouchableOpacity>
  );
};

export default UserIcon;
