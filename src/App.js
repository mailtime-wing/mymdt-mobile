import React from 'react';
import {IntlContainer} from '@/context/Intl';
import {ThemeProvider} from 'emotion-theming';
import theme from '@/theme';
import HomeScreen from '@/screens/HomeScreen';
console.disableYellowBox = true;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <IntlContainer>
        <HomeScreen />
      </IntlContainer>
    </ThemeProvider>
  );
}

export default App;
