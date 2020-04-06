import React from 'react';
import {Container, TextInput, Label, Remark, Error} from './style';

const Input = ({label, required, remark, error, ...props}) => {
  return (
    <Container>
      <Label>
        {label}
        {required && '*'}
      </Label>
      <TextInput autoCapitalize="none" {...props} />
      {<Error>{error ? error : ' '}</Error>}
      {remark && <Remark>{remark}</Remark>}
    </Container>
  );
};
export default Input;
