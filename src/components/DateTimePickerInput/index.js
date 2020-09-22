import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useIntl} from 'react-intl';
import {useTheme} from 'emotion-theming';
import {TextInput, labelStyle, inputContainer} from './style';
import {useField, useFormikContext} from 'formik';

import AppText from '@/components/AppText2';

import DateTimeSelector from './DateTimeSelector';

const DateTimePickerInput = ({
  name,
  label,
  required,
  showDatePicker,
  style,
  onDismiss,
  ...props
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const [field, meta] = useField(name);
  const isError = meta.error;
  const {setFieldValue} = useFormikContext();

  const handleDateChange = date => {
    if (!date) {
      return;
    }

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
    <TouchableOpacity style={style} {...props}>
      <AppText
        variant="label"
        style={labelStyle(theme, showDatePicker, isError)}
        numberOfLines={1}
        ellipsizeMode="clip">
        {label ? label : ' '}
        {required && '*'}
      </AppText>
      <View style={inputContainer(theme, showDatePicker, isError)}>
        <TextInput
          isError={isError}
          onChangeText={field.onChange(name)}
          value={changeDateFormat(field.value)}
          pointerEvents="none"
          placeholder="DD/MM/YYYY"
          editable={false}
          {...props}
        />
      </View>
      {showDatePicker && (
        <DateTimeSelector
          date={field.value}
          onChange={handleDateChange}
          onDismiss={onDismiss} // For Android event press
        />
      )}
    </TouchableOpacity>
  );
};

export default DateTimePickerInput;
