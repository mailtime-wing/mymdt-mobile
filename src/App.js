import React from 'react';
import {ThemeProvider} from 'emotion-theming';
import {ApolloProvider} from '@apollo/react-hooks';
import client from '@/api/client';
import theme from '@/theme';
import {IntlContainer} from '@/context/Intl';
import {AuthProvider} from '@/context/auth';
import {SdkProvider} from '@/context/mailtime-sdk';
import NavigationRoot from '@/screens/Root';
console.disableYellowBox = true;

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <IntlContainer>
          <AuthProvider>
            <SdkProvider>
              <NavigationRoot />
            </SdkProvider>
          </AuthProvider>
        </IntlContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
