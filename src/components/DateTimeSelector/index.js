import React from 'react';
import {View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimeSelector = ({date, onChange}) => {
  const handleOnChange = (event, selectedDate) => {
    onChange(selectedDate);
  };

  return (
    <View>
      <DateTimePicker
        testID="date"
        value={new Date(date)}
        mode="date"
        display="default"
        textColor="black"
        maximumDate={new Date()}
        onChange={handleOnChange}
        // timeZoneOffsetInMinutes={0}
      />
    </View>
  );
};

export default DateTimeSelector;
