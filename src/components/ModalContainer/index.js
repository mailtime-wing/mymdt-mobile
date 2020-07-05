import React from 'react';
import {useHeaderHeight} from '@react-navigation/stack';

import {Container, Title} from './style';

const ModalContainer = ({title, children, style, ...props}) => {
  const headerHeight = useHeaderHeight();
  const marginTop = headerHeight;

  return (
    <Container style={[{marginTop}, style]} {...props}>
      <>
        <Title>{title}</Title>
        {children}
      </>
    </Container>
  );
};

export default ModalContainer;
