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

/**
 * @typedef {import('react-native').ViewStyle} ViewStyle
 * @typedef {import('react-native').TextStyle} TextStyle
 *
 * @typedef {Object} Props
 * @property {string} name
 * @property {JSX.Element} label
 * @property {boolean} required
 * @property {JSX.Element} remark
 * @property {boolean} readOnly
 * @property {TextStyle} remarkOuterStyle
 * @property {TextStyle} textStyle
 * @property {ViewStyle} style
 *
 * @typedef {import('react-native').TextInputProps} TextInputProps
 * @type {import('react').FunctionComponent<TextInputProps & Props>}
 */
const Input = ({
  name,
  label,
  required,
  remark,
  readOnly,
  remarkOuterStyle,
  textStyle,
  style,
  ...props
}) => {
  const theme = useTheme();
  const [isFocus, setIsFocus] = useState(false);
  const [field, meta] = useField(name);
  const isError = meta.touched && meta.error;

  const handleOnFocus = () => {
    setIsFocus(true);
  };

  const handleOnBlur = (e) => {
    field.onBlur(name)(e);
    setIsFocus(false);
  };

  return (
    <Container style={style}>
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
          onChangeText={field.onChange(name)}
          onBlur={handleOnBlur}
          value={field.value}
          autoCapitalize="none"
          isError={isError}
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
