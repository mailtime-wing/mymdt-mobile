import React from 'react';
import {Container, ButtonText} from './style';

const Button = ({style, textStyle, buttonStyle, ...props}) => (
  <Container
    disabled={props.disabled}
    reverse={props.reverse}
    small={props.small}
    medium={props.medium}
    reverseBorder={props.reverseBorder}
    style={buttonStyle}
    {...props}>
    <ButtonText
      disabled={props.disabled}
      reverse={props.reverse}
      small={props.small}
      medium={props.medium}
      style={textStyle}>
      {props.children}
    </ButtonText>
  </Container>
);

export default Button;
