import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from 'emotion-theming';

const DateTimeSelector = ({date, onChange, onDismiss}) => {
  const theme = useTheme();
  const handleOnChange = (event, selectedDate) => {
    if (event.type === 'set' || event.type === 'dismissed') {
      // Anroid only
      onDismiss();
    }
    onChange(selectedDate);
  };

  return (
    <DateTimePicker
      testID="date"
      value={new Date(date)}
      mode="date"
      textColor={theme.colors.textOnBackground.highEmphasis}
      maximumDate={new Date()}
      onChange={handleOnChange}
    />
  );
};

export default DateTimeSelector;
