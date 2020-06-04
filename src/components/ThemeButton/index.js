import React from 'react';
import {Container, ButtonText} from './style';

const Button = props => (
  <Container
    disabled={props.disabled}
    reverse={props.reverse}
    small={props.small}
    reverseBorder={props.reverseBorder}
    {...props}>
    <ButtonText
      disabled={props.disabled}
      reverse={props.reverse}
      small={props.small}>
      {props.children}
    </ButtonText>
  </Container>
);

export default Button;
