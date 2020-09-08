import React, {useState} from 'react';
import {useTheme} from 'emotion-theming';
import {
  Container,
  TextInput,
  TextInputContainer,
  errorStyle,
  remarkStyle,
  labelStyle,
} from './style';
import {useField} from 'formik';

import AppText from '@/components/AppText2';

const Input = ({
  label,
  required,
  remark,
  readOnly,
  remarkOuterStyle,
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
      <AppText
        variant="label"
        style={labelStyle(theme, isFocus, isError)}
        numberOfLines={1}
        ellipsizeMode="clip">
        {label ? label : ' '}
        {required && '*'}
      </AppText>
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
      {remark && (
        <AppText
          variant="caption"
          style={[remarkStyle(theme), remarkOuterStyle]}>
          {remark}
        </AppText>
      )}
      <AppText
        variant="caption"
        style={errorStyle(theme)}
        numberOfLines={1}
        ellipsizeMode="clip">
        {isError ? meta.error : ' '}
      </AppText>
    </Container>
  );
};
export default Input;
