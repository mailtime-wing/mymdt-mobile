import React from 'react';
import {ButtonContainer, Icon, ButtonText, Container} from './style';

const EditButton = (props) => {

  return (
    <ButtonContainer {...props}>
      <Container>
        <Icon source={require('@/assets/icon_edit.png')} />
        <ButtonText>EDIT</ButtonText>
      </Container>
    </ButtonContainer>
  );
};

export default EditButton;
