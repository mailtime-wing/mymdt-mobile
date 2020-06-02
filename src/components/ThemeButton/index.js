import React from 'react';
import {Container, ButtonText} from './style';

const Button = ({children, disabled, reverse, small, ...props}) => (
  <Container disabled={disabled} reverse={reverse} small={small} {...props}>
    <ButtonText disabled={disabled} reverse={reverse} small={small}>
      {children}
    </ButtonText>
  </Container>
);

export default Button;
