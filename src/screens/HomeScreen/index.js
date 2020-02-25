import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { FormattedMessage } from 'react-intl';
import styled, { css } from '@emotion/native'
import { useTheme } from 'emotion-theming'

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const Name = styled.Text`
    color: ${theme.colors.debug};
  `

  const Container = styled.View`
    color: ${theme.colors.pink};
  `
  const name = 'Wing'
  return (
    <View style={styles.container}>
      <Text>
        <FormattedMessage id="home" />
      </Text>
      <Text>
        <FormattedMessage
          id="greetings"
          defaultMessage={'Hi, {name}'}
          values={{name: <Text>{name}</Text>}}
        />
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Language')}>
        <Text>
          <FormattedMessage id="home" />
        </Text>
        <Image source={require('@/assets/icon.png')} />
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
