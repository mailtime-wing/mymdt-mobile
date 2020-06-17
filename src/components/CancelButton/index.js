import React from 'react';
import {ButtonContainer, Icon, ButtonText, Container} from './style';

const CancelButton = (props) => {

  return (
    <ButtonContainer {...props}>
      <Container>
        <Icon source={require('@/assets/icon_x.png')} />
        <ButtonText>CANCEL</ButtonText>
      </Container>
    </ButtonContainer>
  );
};

export default CancelButton;
