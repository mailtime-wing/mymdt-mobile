import React from 'react';
import {ButtonContainer, Icon, ButtonText, Container} from './style';

const ConfirmButton = (props) => {

  return (
    <ButtonContainer 
      disabled={props.disabled}
      {...props}
    >
      <Container>
        <Icon source={require('@/assets/icon_check.png')} />
        <ButtonText>CONFIRM</ButtonText>
      </Container>
    </ButtonContainer>
  );
};

export default ConfirmButton;
