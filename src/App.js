import React from 'react';

import NavigationContainer from '@/NavigationContainer';
import {IntlContainer} from '@/context/Intl';

function App() {
  return (
    <IntlContainer>
      <NavigationContainer />
    </IntlContainer>
  );
}

export default App;
