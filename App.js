import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IntlProvider, FormattedMessage } from 'react-intl';

import HomeScreen from './src/screens/HomeScreen'
import LanguageScreen from './src/screens/LanguageScreen'
import LanguageProvider, { LanguageContext } from './src/context/LanguageContext';

const Stack = createStackNavigator();

const AppContainer = () => {
  const { language, translation } = useContext(LanguageContext)
  return (
    <IntlProvider locale={language} messages={translation}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={"Home"}
            component={HomeScreen}
            options={{ title: <FormattedMessage id='home'/> }}
          />
          <Stack.Screen
            name="Language"
            component={LanguageScreen}
            options={{ title: <FormattedMessage id='language'/> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </IntlProvider>
  )
}

function App(props) {
  return (
    <LanguageProvider>
      <AppContainer {...props} />
    </LanguageProvider>
  );
}

export default App;
