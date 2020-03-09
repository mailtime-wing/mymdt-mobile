import React from 'react';
import {Container, Text} from './style';

const Button = ({children, ...props}) => (
  <Container {...props}>
    <Text>{children}</Text>
  </Container>
);

export default Button;
