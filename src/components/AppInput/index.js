import React, {useState} from 'react';
import {useTheme} from 'emotion-theming';
import {
  Container,
  TextInput,
  Label,
  Remark,
  Error,
  TextInputContainer,
} from './style';
import {useField} from 'formik';

const Input = ({
  label,
  required,
  remark,
  readOnly,
  remarkStyle,
  textStyle,
  placeholder,
  additionalStringToValue,
  ...props
}) => {
  const theme = useTheme();
  const [isFocus, setIsFocus] = useState(false);
  const [field, meta] = useField(props.name);
  const isError = meta.touched && meta.error;

  const handleOnFocus = () => {
    setIsFocus(true);
  };

  const handleOnBlur = e => {
    field.onBlur(props.name)(e);
    setIsFocus(false);
  };

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
          {...props}
          onFocus={handleOnFocus}
          onChangeText={field.onChange(props.name)}
          onBlur={handleOnBlur}
          value={field.value}
          autoCapitalize="none"
          isError={isError}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textOnBackground.disabled}
          style={textStyle}
        />
      </TextInputContainer>
      {remark && <Remark style={remarkStyle}>{remark}</Remark>}
      {
        <Error numberOfLines={1} ellipsizeMode="clip">
          {isError ? meta.error : ' '}
        </Error>
      }
    </Container>
  );
};
export default Input;
