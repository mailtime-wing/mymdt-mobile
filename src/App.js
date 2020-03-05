import React from 'react';
import {IntlContainer} from '@/context/Intl';
import {ThemeProvider} from 'emotion-theming';
import theme from '@/theme';
import {AuthProvider} from '@/context/auth';
console.disableYellowBox = true;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <IntlContainer>
        <AuthProvider />
      </IntlContainer>
    </ThemeProvider>
  );
}

export default App;
