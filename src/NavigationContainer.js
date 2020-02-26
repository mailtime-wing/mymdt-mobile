import React from 'react'
import { NavigationContainer as Container } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FormattedMessage } from 'react-intl';

import HomeScreen from './screens/HomeScreen'
import LanguageScreen from './screens/LanguageScreen'

const Stack = createStackNavigator();

const NavigationContainer = () =>
  <Container>
    <Stack.Navigator>
      <Stack.Screen
        name={"Home"}
        component={HomeScreen}
        options={{ title: <FormattedMessage id='home' /> }}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{ title: <FormattedMessage id='language' /> }}
      />
    </Stack.Navigator>
  </Container>

export default NavigationContainer