import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen'
import LanguageScreen from './src/screens/LanguageScreen'
import LanguageProvider, { LanguageContext } from './src/context/LanguageContext';

const Stack = createStackNavigator();

const AppContainer = () => {
  const { translation } = useContext(LanguageContext)
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name={"Home"}
          component={HomeScreen}
          options={{ title: translation.home}}
        />
        <Stack.Screen 
          name="Language" 
          component={LanguageScreen} 
          options={{ title: translation.language}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function App(props) {
  return (
    <LanguageProvider>
      <AppContainer {...props}/>
    </LanguageProvider>
  );
}

export default App;
