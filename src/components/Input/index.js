import React from 'react';
import {Container, TextInput, Label} from './style';

const Input = ({label, ...props}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <TextInput autoCapitalize="none" {...props} />
    </Container>
  );
};
export default Input;
