import React from 'react';
import {Container, ButtonText} from './style';

const Button = ({style, ...props}) => (
  <Container
    disabled={props.disabled}
    reverse={props.reverse}
    small={props.small}
    medium={props.medium}
    reverseBorder={props.reverseBorder}
    style={style}
    {...props}>
    <ButtonText
      disabled={props.disabled}
      reverse={props.reverse}
      small={props.small}
      medium={props.medium}
      style={style}
      {...props}
    >
      {props.children}
    </ButtonText>
  </Container>
);

export default Button;
