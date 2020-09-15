import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from 'emotion-theming';

const DateTimeSelector = ({date, onChange}) => {
  const theme = useTheme();
  const handleOnChange = (event, selectedDate) => {
    onChange(selectedDate);
  };

  return (
    <DateTimePicker
      testID="date"
      value={new Date(date)}
      mode="date"
      display="default"
      textColor={theme.colors.textOnBackground.highEmphasis}
      maximumDate={new Date()}
      onChange={handleOnChange}
    />
  );
};

export default DateTimeSelector;
