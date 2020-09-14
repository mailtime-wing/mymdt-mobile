import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import client from '@/api/client';
import {ThemeProvider} from '@/context/theme';
import {IntlContainer} from '@/context/Intl';
import {AuthProvider} from '@/context/auth';
import {PreloadDataProvider} from '@/context/preloadData';
import {SetupFlowProvider} from '@/context/setupFlow';
import {NotificationProvider} from '@/context/notification';
import NavigationRoot from '@/screens/Root';

function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <ThemeProvider>
          <IntlContainer>
            <AuthProvider>
              <NotificationProvider>
                <PreloadDataProvider>
                  <SetupFlowProvider>
                    <NavigationRoot />
                  </SetupFlowProvider>
                </PreloadDataProvider>
              </NotificationProvider>
            </AuthProvider>
          </IntlContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default App;
