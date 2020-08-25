import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

const CloseButton = ({navigation, ...props}) => {
  return (
    <TouchableOpacity onPress={() => navigation?.goBack()} {...props}>
      <Image source={require('@/assets/close.png')} resizeMode="contain" />
    </TouchableOpacity>
  );
};

export default CloseButton;
