import React from 'react';
import {ThemeProvider} from 'emotion-theming';
import {ApolloProvider} from '@apollo/react-hooks';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import client from '@/api/client';
import theme from '@/theme';
import {IntlContainer} from '@/context/Intl';
import {AuthProvider} from '@/context/auth';
import {PreloadDataProvider} from '@/context/preloadData';
import NavigationRoot from '@/screens/Root';

function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <IntlContainer>
            <AuthProvider>
              <PreloadDataProvider>
                <NavigationRoot />
              </PreloadDataProvider>
            </AuthProvider>
          </IntlContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default App;
