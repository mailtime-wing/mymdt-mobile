import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {FormattedMessage} from 'react-intl';

export default function HomeScreen({navigation}) {
  const name = 'Wing';
  return (
    <View style={styles.container}>
      <Text>
        <FormattedMessage id="home" />
      </Text>
      <Text>
        <FormattedMessage
          id="greetings"
          defaultMessage={`Hi, {name}`}
          values={{name: <Text>{name}</Text>}}
        />
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Language')}>
        <Text>
          <FormattedMessage id="setting" />
        </Text>
        <Image source={require('@assets/icon.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
