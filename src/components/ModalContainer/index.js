import React from 'react';
import {Container, ScrollContainer, Title} from './style';

const ModalContaienr = ({title, children}) => (
  <Container>
    <ScrollContainer
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <Title>{title}</Title>
      {children}
    </ScrollContainer>
  </Container>
);

export default ModalContaienr;
