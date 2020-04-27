import React, {useState} from 'react';
import {
  Container,
  TextInput,
  Label,
  Remark,
  Error,
  TextInputContainer,
} from './style';

const Input = ({label, required, remark, error, ...props}) => {
  const [isFocus, setIsFocus] = useState(false);
  const isError = !!error;
  return (
    <Container>
      <Label isError={isError} isFocus={isFocus}>
        {label}
        {required && '*'}
      </Label>
      <TextInputContainer isError={isError} isFocus={isFocus}>
        <TextInput
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoCapitalize="none"
          isFocus={isFocus}
          isError={isError}
          {...props}
        />
      </TextInputContainer>
      {remark && <Remark>{remark}</Remark>}
      {<Error>{isError ? error : ' '}</Error>}
    </Container>
  );
};
export default Input;
