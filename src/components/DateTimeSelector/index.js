import React from 'react';
import {View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimeSelector = ({show, date, callback}) => {
  const onChange = (event, selectedDate) => {
    callback(selectedDate);
  };
  return (
    <View>
      {show && (
        <DateTimePicker
          testID="date"
          value={new Date(date)}
          mode="date"
          display="default"
          textColor="black"
          maximumDate={new Date()}
          onChange={onChange}
          // timeZoneOffsetInMinutes={0}
        />
      )}
    </View>
  );
};

export default DateTimeSelector;
