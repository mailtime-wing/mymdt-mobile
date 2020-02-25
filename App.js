import React from 'react';

import NavigationContainer from './src/NavigationContainer'
import { IntlProvider } from './src/context/IntlContext';

function App() {
  return (
    <IntlProvider locale="en-US">
      <NavigationContainer />
    </IntlProvider>
  );
}

export default App;
