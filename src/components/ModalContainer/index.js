import React from 'react';
import {Container, ScrollContainer} from './style';

const ModalContaienr = ({children}) => (
  <Container>
    <ScrollContainer>{children}</ScrollContainer>
  </Container>
);

export default ModalContaienr;
