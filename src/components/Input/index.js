import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

const Input = props => {
  return (
    <View>
      <TextInput
        autoCapitalize="none"
        {...props}
        style={{...styles.input, ...props.style}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
});

export default Input;
