import React from 'react';
import {ThemeProvider} from 'emotion-theming';
import theme from '@/theme';
import {IntlContainer} from '@/context/Intl';
import {AuthProvider} from '@/context/auth';
import NavigationRoot from '@/screens/Root';
console.disableYellowBox = true;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <IntlContainer>
        <AuthProvider>
          <NavigationRoot />
        </AuthProvider>
      </IntlContainer>
    </ThemeProvider>
  );
}

export default App;
