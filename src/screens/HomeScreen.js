import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FormattedMessage } from 'react-intl';

export default function HomeScreen({ navigation }) {
  const name = 'Wing'
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Language')}
      >
        <Text>
          <FormattedMessage
            id="greetings"
            defaultMessage={`Hi, {name}`}
            values={{ name: <Text>{name}</Text> }}
          />
        </Text>
        <Text>
          <FormattedMessage id='setting' />
        </Text>
        <Text>
          <FormattedMessage id="home" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}