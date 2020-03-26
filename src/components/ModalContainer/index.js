import React from 'react';
import {Container, ScrollContainer, Title} from './style';

const ModalContaienr = ({title, children}) => (
  <Container>
    <Title>{title}</Title>
    <ScrollContainer>{children}</ScrollContainer>
  </Container>
);

export default ModalContaienr;
