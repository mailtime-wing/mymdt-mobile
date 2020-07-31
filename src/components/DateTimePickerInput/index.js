import React from 'react';
import {useIntl} from 'react-intl';
import {
  Container,
  TextInput,
  Label,
  Remark,
  Error,
  TextInputContainer,
} from './style';
import {useField, useFormikContext} from 'formik';

import DateTimeSelector from './DateTimeSelector';

const DateTimePickerInput = ({
  name,
  label,
  required,
  remark,
  showDatePicker,
  ...props
}) => {
  const intl = useIntl();
  const [field, meta] = useField(name);
  const isError = meta.error;
  const {setFieldValue} = useFormikContext();
  console.log('field.value', field.value);

  const handleDateChange = date => {
    setFieldValue(name, date);
  };

  const changeDateFormat = isoDate => {
    return intl.formatDate(isoDate, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <Container>
      <Label
        isError={isError}
        isFocus={showDatePicker}
        numberOfLines={1}
        ellipsizeMode="clip">
        {label}
        {required && '*'}
      </Label>
      <TextInputContainer isError={isError} isFocus={showDatePicker}>
        <TextInput
          isError={isError}
          onChangeText={field.onChange(name)}
          value={changeDateFormat(field.value)}
          pointerEvents="none"
          placeholder="DD/MM/YYYY"
          {...props}
        />
      </TextInputContainer>
      {remark && <Remark>{remark}</Remark>}
      {
        <Error numberOfLines={1} ellipsizeMode="clip">
          {isError ? meta.error : ' '}
        </Error>
      }
      {showDatePicker && (
        <DateTimeSelector date={field.value} onChange={handleDateChange} />
      )}
    </Container>
  );
};

export default DateTimePickerInput;
