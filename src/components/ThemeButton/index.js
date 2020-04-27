import React from 'react';
import {Container, Text} from './style';

const Button = ({children, disabled, reverse, small, ...props}) => (
  <Container disabled={disabled} reverse={reverse} small={small} {...props}>
    <Text disabled={disabled} reverse={reverse} small={small}>
      {children}
    </Text>
  </Container>
);

export default Button;
