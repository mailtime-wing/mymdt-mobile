import React from 'react';

import NavigationContainer from './src/NavigationContainer'
import { IntlContainer } from './src/context/Intl';

function App() {
  return (
    <IntlContainer>
      <NavigationContainer />
    </IntlContainer>
  );
}

export default App;
