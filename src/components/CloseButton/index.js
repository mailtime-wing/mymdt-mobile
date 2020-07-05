import React from 'react';
import {ButtonContainer, Icon} from './style';

const CloseButton = props => {
  return (
    <ButtonContainer {...props}>
      <Icon source={require('@/assets/close.png')} resizeMode="contain" />
    </ButtonContainer>
  );
};

export default CloseButton;
