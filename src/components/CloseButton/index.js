import React from 'react';
import {ButtonContainer, Icon} from './style';

const CloseButton = ({navigation, ...props}) => {
  return (
    <ButtonContainer onPress={() => navigation?.goBack()} {...props}>
      <Icon source={require('@/assets/close.png')} resizeMode="contain" />
    </ButtonContainer>
  );
};

export default CloseButton;
