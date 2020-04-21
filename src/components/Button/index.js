import React from 'react';
import {Container, Text} from './style';

const Button = ({children, disabled, reverse, ...props}) => (
  <Container disabled={disabled} reverse={reverse} {...props}>
    <Text disabled={disabled} reverse={reverse}>
      {children}
    </Text>
  </Container>
);

export default Button;
