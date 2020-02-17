import React, { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { LanguageContext } from './../context/LanguageContext';

export default function HomeScreen({ navigation }) {
  const { translation } = useContext(LanguageContext)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Language')}
      >
        <Text>{translation.setting}</Text>
      </TouchableOpacity>
    </View>
  );
}