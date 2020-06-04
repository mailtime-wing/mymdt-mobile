import React, {useState} from 'react';
import {
  Container,
  TextInput,
  Label,
  Remark,
  Error,
  TextInputContainer,
} from './style';

const Input = ({label, required, remark, error, readOnly, ...props}) => {
  const [isFocus, setIsFocus] = useState(false);
  const isError = !!error;
  return (
    <Container>
      <Label
        isError={isError}
        isFocus={isFocus}
        numberOfLines={1}
        ellipsizeMode="clip">
        {label}
        {required && '*'}
      </Label>
      <TextInputContainer
        isError={isError}
        isFocus={isFocus}
        readOnly={readOnly}>
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
      {
        <Error numberOfLines={1} ellipsizeMode="clip">
          {isError ? error : ' '}
        </Error>
      }
    </Container>
  );
};
export default Input;
