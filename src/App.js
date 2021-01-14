import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import client from '@/apollo/client';
import {ThemeProvider} from '@/context/theme';
import {IntlContainer} from '@/context/Intl';
import {AuthProvider} from '@/context/auth';
import {PreloadDataProvider} from '@/context/preloadData';
import {SetupFlowProvider} from '@/context/setupFlow';
import {NotificationProvider} from '@/context/notification';
import ToastProvider from '@/context/toast/provider';
import {BranchProvider} from '@/context/branch';
import {SplashProvider} from '@/context/splash';
import {BankProvider} from '@/context/bank';
import {VersionCheckProvider} from '@/context/versionCheck';
import NavigationRoot from '@/screens/Root';

function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <IntlContainer>
                <NotificationProvider>
                  <PreloadDataProvider>
                    <BranchProvider>
                      <SplashProvider>
                        <VersionCheckProvider>
                          {/* UI related components are placed under splash to avoid flickerin */}
                          <SetupFlowProvider>
                            <BankProvider>
                              <NavigationRoot />
                            </BankProvider>
                          </SetupFlowProvider>
                        </VersionCheckProvider>
                      </SplashProvider>
                    </BranchProvider>
                  </PreloadDataProvider>
                </NotificationProvider>
              </IntlContainer>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default App;
