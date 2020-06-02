import React from 'react';
import {Container, ButtonText} from './style';

const Button = ({children, disabled, reverse, ...props}) => (
  <Container disabled={disabled} reverse={reverse} {...props}>
    <ButtonText disabled={disabled} reverse={reverse}>
      {children}
    </ButtonText>
  </Container>
);

export default Button;
