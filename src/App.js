import React from 'react';
import {IntlContainer} from '@/context/Intl';
import {ThemeProvider} from 'emotion-theming';
import theme from '@/theme';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer as Container} from '@react-navigation/native';

import HomeStack from '@/screens/HomeStack';
import ModalStack from '@/screens/ModalStack';
console.disableYellowBox = true;
const Stack = createStackNavigator();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <IntlContainer>
        <Container>
          <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="Home" component={HomeStack} />
            <Stack.Screen name="Modal" component={ModalStack} />
          </Stack.Navigator>
        </Container>
      </IntlContainer>
    </ThemeProvider>
  );
}

export default App;
