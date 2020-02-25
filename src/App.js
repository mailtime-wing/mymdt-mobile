import React from 'react';

import NavigationContainer from '@/NavigationContainer';
import { IntlContainer } from '@/context/Intl';
import { ThemeProvider } from 'emotion-theming'
import theme from './src/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <IntlContainer>
        <NavigationContainer />
      </IntlContainer>
    </ThemeProvider>
  )
}

export default App;
