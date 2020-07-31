import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimeSelector = ({date, onChange}) => {
  const handleOnChange = (event, selectedDate) => {
    onChange(selectedDate);
  };

  return (
    <DateTimePicker
      testID="date"
      value={new Date(date)}
      mode="date"
      display="default"
      textColor="black"
      maximumDate={new Date()}
      onChange={handleOnChange}
    />
  );
};

export default DateTimeSelector;
