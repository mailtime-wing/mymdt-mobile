import React from 'react';
import {Container, TextInput, Label, Remark} from './style';

const Input = ({label, required, remark, ...props}) => {
  return (
    <Container>
      <Label>
        {label}
        {required && '*'}
      </Label>
      <TextInput autoCapitalize="none" {...props} />
      {remark && <Remark>{remark}</Remark>}
    </Container>
  );
};
export default Input;
