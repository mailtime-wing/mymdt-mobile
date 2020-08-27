import React from 'react';
import {TouchableOpacity} from 'react-native';

import CloseIcon from '@/assets/close_button.svg';
import {useTheme} from 'emotion-theming';

const CloseButton = ({navigation, ...props}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={() => navigation?.goBack()} {...props}>
      <CloseIcon stroke={theme.colors.borderColor} strokeWidth={2} />
    </TouchableOpacity>
  );
};

export default CloseButton;
