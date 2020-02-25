import React from 'react';

import NavigationContainer from './src/NavigationContainer'
import { IntlProviderWrapper } from './src/context/IntlContext';

function App() {
  return (
    <IntlProviderWrapper>
      <NavigationContainer />
    </IntlProviderWrapper>
  );
}

export default App;
